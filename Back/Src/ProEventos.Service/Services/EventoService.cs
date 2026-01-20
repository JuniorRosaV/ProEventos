using ProEventos.Service.Interfaces;
using ProEventos.Repository.Interfaces;
using ProEventos.Domain.Models;
using ProEventos.Service.Dtos;
using AutoMapper;


namespace ProEventos.Service.Services;

public class EventoService : IEventoService
{
    private readonly IGeralRepository _geralRepository;
    private readonly IEventoRepository _eventoRepository;
    private readonly IMapper _mapper;

    public EventoService(IGeralRepository geralRepository,
                         IEventoRepository eventoRepository,
                         IMapper mapper)
    {
        _geralRepository = geralRepository;
        _eventoRepository = eventoRepository;
        _mapper = mapper;
    }


    public async Task<EventoDto> AddEvento(EventoDto model)
    {
        var evento = _mapper.Map<Evento>(model);

        _geralRepository.Add<Evento>(evento);

        var sucesso = await _geralRepository.SaveChangesAsync();
        if (!sucesso)
            throw new Exception("Erro ao salvar alterações do evento.");

        var eventoRetorno = await _eventoRepository
            .GetEventoByIdAsync(evento.Id, false, false);

        return _mapper.Map<EventoDto>(eventoRetorno);

    }

    public async Task<EventoDto> UpdateEvento(int eventoId, EventoDto model)
    {
        var evento = await _eventoRepository.GetEventoByIdAsync(eventoId, false, false);
        if (evento == null) throw new Exception("Evento para update não encontrado.");

        _mapper.Map(model, evento);

        _geralRepository.Update<Evento>(evento);

        var sucesso = await _geralRepository.SaveChangesAsync();
        if (!sucesso)
            throw new Exception("Erro ao salvar alterações do evento.");

        var eventoRetorno = await _eventoRepository
            .GetEventoByIdAsync(evento.Id, false, false);

        return _mapper.Map<EventoDto>(eventoRetorno);
    }

    public Task<bool> DeleteEvento(int EventoId)
    {
        var evento = _eventoRepository.GetEventoByIdAsync(EventoId, false).Result;
        if (evento == null) throw new Exception("Evento para delete não encontrado.");

        _geralRepository.Delete<Evento>(evento);

        return _geralRepository.SaveChangesAsync();
    }

    public async Task<EventoDto[]> GetAllEventosAsync(bool includePalestrantes = false)
    {
        var eventos = await _eventoRepository.GetAllEventosAsync(includePalestrantes);
        if (eventos == null) throw new Exception("Nenhum evento encontrado.");

        return _mapper.Map<EventoDto[]>(eventos);
    }

    public async Task<EventoDto[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes)
    {
        var eventos = await _eventoRepository.GetAllEventosByTemaAsync(tema, includePalestrantes);
        if (eventos == null) throw new Exception("Nenhum evento encontrado para o tema informado.");

        return _mapper.Map<EventoDto[]>(eventos);
    }

    public async Task<EventoDto> GetEventoByIdAsync(int eventoId, bool includePalestrantes)
    {
        var evento = await _eventoRepository.GetEventoByIdAsync(eventoId, includePalestrantes);
        if (evento == null) throw new Exception("Evento não encontrado por Id informado.");

        return _mapper.Map<EventoDto>(evento);
    }
}
