using ProEventos.Service.Interfaces;
using ProEventos.Repository.Interfaces;
using ProEventos.Domain.Models;
using ProEventos.Service.Dtos;
using AutoMapper;
using Microsoft.Extensions.Logging;

namespace ProEventos.Service.Services;

public class LotesService : ILotesService
{
    private readonly IGeralRepository _geralRepository;
    private readonly ILotesRepository _lotesRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<LotesService> _logger;

    public LotesService(IGeralRepository geralRepository,
                         ILotesRepository lotesRepository,
                         IMapper mapper,
                         ILogger<LotesService> logger)
    {
        _geralRepository = geralRepository;
        _lotesRepository = lotesRepository;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task AddLote(int eventoId, LotesDto model)
    {
        try
        {
            var lote = _mapper.Map<Lote>(model);
            lote.EventoId = eventoId;
            _geralRepository.Add<Lote>(lote);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<bool> DeleteLote(int eventoId, int loteId)
    {
        try
        {
            var lote = await _lotesRepository.GetLoteByIdAsync(eventoId, loteId);
            if (lote == null) throw new Exception("Lote para delete não encontrado.");

            _geralRepository.Delete<Lote>(lote);
            return await _geralRepository.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    // CORRIGIDO: Nome removido o 's' para bater com a Interface
    public async Task<LotesDto> GetLoteByIdAsync(int eventoId, int loteId)
    {
        try
        {
            var lote = await _lotesRepository.GetLoteByIdAsync(eventoId, loteId);
            if (lote == null) return null;

            // CORRIGIDO: Tipo para LotesDto
            var resultado = _mapper.Map<LotesDto>(lote);

            return resultado;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<LotesDto[]> GetLotesByEventoIdAsync(int eventoId)
    {
        try
        {
            var lotes = await _lotesRepository.GetLotesByEventoIdAsync(eventoId);
            if (lotes == null) return null;

            // CORRIGIDO: Tipo para LotesDto
            var resultado = _mapper.Map<LotesDto[]>(lotes);

            return resultado;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<LotesDto[]> SaveLotes(int eventoId, LotesDto[] models)
    {
        try
        {
            _logger.LogInformation("Iniciando SaveLotes para evento {eventoId} com {count} lotes", eventoId, models.Length);

            var lotes = await _lotesRepository.GetLotesByEventoIdAsync(eventoId);
            if (lotes == null) return null;

            foreach (var model in models)
            {
                _logger.LogInformation("Processando lote Id {id} para evento {eventoId}", model.Id, eventoId);

                if (model.Id == 0)
                {
                    await AddLote(eventoId, model);
                }
                else
                {
                    var lote = lotes.FirstOrDefault(l => l.Id == model.Id);
                    model.EventoId = eventoId;

                    if (lote == null)
                    {
                        _logger.LogWarning("Lote Id {id} não encontrado, adicionando como novo", model.Id);
                        await AddLote(eventoId, model);
                    }
                    else
                    {
                        _mapper.Map(model, lote);
                        _geralRepository.Update<Lote>(lote);
                    }
                }
            }

            var sucesso = await _geralRepository.SaveChangesAsync();
            if (!sucesso)
                throw new Exception("Erro ao salvar lotes.");

            var loteRetorno = await _lotesRepository.GetLotesByEventoIdAsync(eventoId);
            return _mapper.Map<LotesDto[]>(loteRetorno);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao salvar lotes para evento {eventoId}", eventoId);
            throw new Exception(ex.Message);
        }
    }
}