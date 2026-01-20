namespace ProEventos.Service.Dtos;

public class PalestranteDto
{
    public required string Nome { get; set; }
    public required string MiniCurriculo { get; set; }
    public required string ImagemUrl { get; set; }
    public string Telefone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public IEnumerable<RedeSocialDto> RedesSociais { get; set; } = Array.Empty<RedeSocialDto>();    
}
