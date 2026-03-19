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

    public async Task<LotesDto[]> SaveLotes(int eventoId, LotesDto[] model)
    {
        try
        {
            if (model == null) return new LotesDto[0];

            var lotes = await _lotesRepository.GetLotesByEventoIdAsync(eventoId) ?? new Lote[0];

            foreach (var lote in model)
            {
                if (lote.Id == 0)
                {
                    var loteAdd = _mapper.Map<Lote>(lote);
                    loteAdd.EventoId = eventoId;
                    _geralRepository.Add(loteAdd);
                }
                else
                {
                    var loteAtual = lotes.FirstOrDefault(l => l.Id == lote.Id);
                    if (loteAtual != null)
                    {
                        _mapper.Map(lote, loteAtual);
                        _geralRepository.Update(loteAtual);
                    }
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
