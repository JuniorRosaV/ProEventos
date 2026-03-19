using ProEventos.Domain.Models;
namespace ProEventos.Repository.Interfaces;

public interface ILotesRepository
{
    Task<Lote[]> GetLotesByEventoIdAsync(int eventoId);
    Task<Lote> GetLoteByIdAsync(int EventoId, int loteId);
}
