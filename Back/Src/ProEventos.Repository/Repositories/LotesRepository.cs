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
            return await _context.Lotes.AsNoTracking().Where(l => l.EventoId == eventoId).ToArrayAsync();
        }

        public async Task<Lote> GetLoteByIdAsync(int EventoId, int loteId)
        {
            return await _context.Lotes.AsNoTracking()
            .FirstOrDefaultAsync(l => l.EventoId == EventoId && l.Id == loteId);
        }
    }
}

