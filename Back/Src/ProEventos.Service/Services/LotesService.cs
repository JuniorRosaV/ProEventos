using ProEventos.Service.Interfaces;
using ProEventos.Repository.Interfaces;
using ProEventos.Domain.Models;
using ProEventos.Service.Dtos;
using AutoMapper;

namespace ProEventos.Service.Services;

public class LotesService : ILotesService
{
    private readonly IGeralRepository _geralRepository;
    private readonly ILotesRepository _lotesRepository;
    private readonly IMapper _mapper;

    public LotesService(IGeralRepository geralRepository,
                         ILotesRepository lotesRepository,
                         IMapper mapper)
    {
        _geralRepository = geralRepository;
        _lotesRepository = lotesRepository;
        _mapper = mapper;
    }

    public async Task AddLote(int eventoId, LotesDto model)
    {
        try
        {
            var lote = _mapper.Map<Lote>(model);
            lote.EventoId = eventoId;

            _geralRepository.Add<Lote>(lote);
            await _geralRepository.SaveChangesAsync();
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
            var lotes = await _lotesRepository.GetLotesByEventoIdAsync(eventoId);
            if (lotes == null) return null;

            foreach (var model in models)
            {
                if (model.Id == 0)
                {
                    await AddLote(eventoId, model);
                }
                else
                {
                    var lote = lotes.FirstOrDefault(l => l.Id == model.Id);
                    model.EventoId = eventoId;

                    _mapper.Map(model, lote);
                    _geralRepository.Update<Lote>(lote);
                    await _geralRepository.SaveChangesAsync();
                }
            }
            var loteRetorno = await _lotesRepository.GetLotesByEventoIdAsync(eventoId);
            return _mapper.Map<LotesDto[]>(loteRetorno);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }
}