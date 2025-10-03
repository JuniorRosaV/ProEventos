using ProEventos.Service.Interfaces;
using ProEventos.Repository.Interfaces;
using ProEventos.Domain.Models;

namespace ProEventos.Service.Services;

public class EventoService : IEventoService
{
    private readonly IGeralRepository _geralRepository;
    private readonly IEventoRepository _eventoRepository;

    public EventoService(IGeralRepository geralRepository, IEventoRepository eventoRepository)
    {
        _geralRepository = geralRepository;
        _eventoRepository = eventoRepository;
    }


    public async Task<Evento> AddEvento(Evento Model)
    {
        try
        {
            _geralRepository.Add<Evento>(Model);
            if (await _geralRepository.SaveChangesAsync())
            {
                return await _eventoRepository.GetEventoByIdAsync(Model.Id, false);
            }

            return null;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }

    }
    public async Task<Evento> UpdateEvento(int eventoId, Evento model)
    {
        var eventoBanco = await _eventoRepository.GetEventoByIdAsync(eventoId, true);
        if (eventoBanco == null) return null;

        // Atualiza campos simples
        eventoBanco.Tema = model.Tema;
        eventoBanco.Local = model.Local;
        eventoBanco.DataEvento = model.DataEvento;
        eventoBanco.QtdPessoas = model.QtdPessoas;
        eventoBanco.ImagemUrl = model.ImagemUrl;

        // Atualiza lotes
        foreach (var lote in model.Lotes)
        {
            var loteExistente = eventoBanco.Lotes.FirstOrDefault(x => x.Id == lote.Id);
            if (loteExistente != null)
            {
                // Atualiza campos do lote
                loteExistente.Nome = lote.Nome;
                loteExistente.Preco = lote.Preco;
                loteExistente.DataInicio = lote.DataInicio;
                loteExistente.DataFim = lote.DataFim;
                loteExistente.Quantidade = lote.Quantidade;
            }
            else
            {
                // Novo lote
                eventoBanco.Lotes.Add(lote);
            }
        }

        await _geralRepository.SaveChangesAsync();
        return await _eventoRepository.GetEventoByIdAsync(eventoId, true);
    }


    public Task<bool> DeleteEvento(int EventoId)
    {
        try
        {
            var evento = _eventoRepository.GetEventoByIdAsync(EventoId, false).Result;
            if (evento == null) throw new Exception("Evento para delete não encontrado.");

            _geralRepository.Delete<Evento>(evento);

            return _geralRepository.SaveChangesAsync();

        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false)
    {
            try
            {
                var eventos = await _eventoRepository.GetAllEventosAsync(includePalestrantes);

                return eventos;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
    }

    public async Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes)
    {
        try
        {
            var eventos = await _eventoRepository.GetAllEventosByTemaAsync(tema, includePalestrantes);
            if (eventos == null) return null;

            return eventos;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    

    public async Task<Evento> GetEventoByIdAsync(int eventoId, bool includePalestrantes)
    {
            try
            {
                var evento = await _eventoRepository.GetEventoByIdAsync(eventoId, includePalestrantes);
                if (evento == null) return null;
                return evento;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
    }
}
