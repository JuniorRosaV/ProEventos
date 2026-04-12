using ProEventos.Repository.Context;
using ProEventos.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain.Models;

namespace ProEventos.Repository.Repositories
{
    public class LotesRepository : ILotesRepository
    {
        private readonly ProEventosContext _context;
        public LotesRepository(ProEventosContext context)
        {
            _context = context;
        }
    
    public async Task<Lote[]> GetLotesByEventoIdAsync(int eventoId)
    {
        IQueryable<Lote> query = _context.Lotes;

        query = query.AsNoTracking()
                    .Where(lote => lote.EventoId == eventoId);

        return await query.ToArrayAsync();
    }
        

    public async Task<Lote> GetLoteByIdAsync(int eventoId, int id)
    {
        IQueryable<Lote> query = _context.Lotes;

        query = query.AsNoTracking()
                    .Where(lote => lote.EventoId == eventoId && lote.Id == id);

        return await query.FirstOrDefaultAsync();
    }
    }
}

