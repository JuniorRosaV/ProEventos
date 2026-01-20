namespace ProEventos.Domain.Models;

public class Palestrante
{
    public int Id { get; set; }
    public required string Nome { get; set; }
    public required string MiniCurriculo { get; set; }
    public required string ImagemUrl { get; set; }
    public string Telefone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public IEnumerable<RedeSocial> RedesSociais { get; set; } = new List<RedeSocial>();
    public IEnumerable<PalestranteEvento> PalestrantesEventos { get; set; } = new List<PalestranteEvento>();
}
