using ProEventos.Repository.Context;
using ProEventos.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain.Models;

namespace ProEventos.Repository.Repositories
{
    public class EventoRepository : IEventoRepository
    {
        private readonly ProEventosContext _context;
        public EventoRepository(ProEventosContext context)
        {
            _context = context;
        }
        public async Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes, bool asNoTracking = true)
        {
            IQueryable<Evento> query = _context.Eventos
                .Include(e => e.Lotes)
                .Include(e => e.RedesSociais);

            if (includePalestrantes)
            {
                query = query
                    .Include(e => e.PalestrantesEventos)
                    .ThenInclude(pe => pe.Palestrante);
            }

            query = query.OrderBy(e => e.Id)
                         .Where(e => e.Tema.ToLower().Contains(tema.ToLower()));

            if (asNoTracking)query = query.AsNoTracking();

            return await query.ToArrayAsync();
        }

        public async Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false, bool asNoTracking = true)
        {
            IQueryable<Evento> query = _context.Eventos
                .Include(e => e.Lotes)
                .Include(e => e.RedesSociais);

            if (includePalestrantes)
            {
                query = query
                .Include(e => e.PalestrantesEventos)
                .ThenInclude(pe => pe.Palestrante);
            }

            query = query.OrderBy(e => e.Id);

            if (asNoTracking) query = query.AsNoTracking();

            return await query.ToArrayAsync();
        }

        public async Task<Evento> GetEventoByIdAsync(int eventoId, bool includePalestrantes, bool asNoTracking = false)
        {
            IQueryable<Evento> query = _context.Eventos
                .Include(e => e.Lotes)
                .Include(e => e.RedesSociais);

            if (includePalestrantes)
            {
                query = query
                .Include(e => e.PalestrantesEventos)
                .ThenInclude(pe => pe.Palestrante);
            }
            query = query
                    .OrderBy(e => e.Id)
                    .Where(e => e.Id == eventoId);

            if (asNoTracking) query = query.AsNoTracking();

            return await query.FirstOrDefaultAsync();
        }
    }
}
