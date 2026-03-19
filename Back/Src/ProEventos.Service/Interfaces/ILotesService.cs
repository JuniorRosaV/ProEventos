using ProEventos.Service.Dtos;
using ProEventos.Domain.Models;

namespace ProEventos.Service.Interfaces;

public interface ILotesService
{
    Task<LotesDto[]> GetLotesByEventoIdAsync(int eventoId);
    Task<LotesDto> GetLoteByIdAsync(int EventoId, int loteId);
    Task<LotesDto[]> SaveLotes(int eventoId, LotesDto[] model);
    Task<bool> DeleteLote(int eventoId, int loteId);
}
