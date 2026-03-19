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

    public async Task<LotesDto[]> GetLotesByEventoIdAsync(int eventoId)
    {
        try
        {
            var lote = await _lotesRepository.GetLotesByEventoIdAsync(eventoId);
            if (lote == null) return Array.Empty<LotesDto>();

            var resultado = _mapper.Map<LotesDto[]>(lote);
            return resultado;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }
        

    public async Task<LotesDto> GetLoteByIdAsync(int eventoId, int loteId)
    {
        try
        {
            var lote = await _lotesRepository.GetLoteByIdAsync(eventoId, loteId);
            return lote == null ? null : _mapper.Map<LotesDto>(lote);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<LotesDto> AddLote(int eventoId, LotesDto model)
    {
        try
        {
            var lote = _mapper.Map<Lote>(model);
            lote.EventoId = eventoId;

            _geralRepository.Add<Lote>(lote);

            if (await _geralRepository.SaveChangesAsync())
            {
                var loteRetorno = await _lotesRepository
                    .GetLoteByIdAsync(eventoId, lote.Id);

                return _mapper.Map<LotesDto>(loteRetorno);
            }

            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.InnerException?.Message);
            throw;
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
                    var loteAtual = lotes.FirstOrDefault(l => l.Id == model.Id);
                    model.EventoId = eventoId;
                    _mapper.Map(model, loteAtual);
                    _geralRepository.Update<Lote>(loteAtual);
                    await _geralRepository.SaveChangesAsync();
                }
            }

            if (await _geralRepository.SaveChangesAsync())
            {
                var lotesRetorno = await _lotesRepository.GetLotesByEventoIdAsync(eventoId);
                return _mapper.Map<LotesDto[]>(lotesRetorno);
            }

            return new LotesDto[0];
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public Task<bool> DeleteLote(int EventoId,int loteId)
    {
        try            
        {
            var lote = _lotesRepository.GetLoteByIdAsync(EventoId, loteId).Result;
            if (lote == null) throw new Exception("Lote para delete não encontrado.");

            _geralRepository.Delete<Lote>(lote);

            return _geralRepository.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

}
