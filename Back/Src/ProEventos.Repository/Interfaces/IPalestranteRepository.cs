using ProEventos.Domain;
namespace ProEventos.Repository.Interfaces;

public interface IPalestranteRepository
{
    Task<Palestrante[]> GetAllPalestrantesAsync(bool IncludeEventos);
    Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string Nome, bool IncludeEventos);
    Task<Palestrante> GetPalestranteByIdAsync(int PalestranteId, bool IncludeEventos);
}
