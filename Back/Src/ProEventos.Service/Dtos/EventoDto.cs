using System.ComponentModel.DataAnnotations;    
namespace ProEventos.Service.Dtos;
public class EventoDto
{
    public int Id { get; set; }

    [Required(ErrorMessage = "O campo {0} é obrigatório.")]
    public required string Local { get; set; } 
    public required string DataEvento { get; set; } 
    public required string Tema { get; set; }
    public required int QtdPessoas { get; set; }
    public required string ImagemUrl { get; set; }
    [Phone(ErrorMessage = "O campo {0} está em formato inválido.")]
    public string Telefone { get; set; } = string.Empty;
    [EmailAddress(ErrorMessage = "O campo {0} está em formato inválido.")]
    public string Email { get; set; } = string.Empty;
    public RedeSocialDto[] RedesSociais { get; set; } = Array.Empty<RedeSocialDto>();
    public LotesDto[] Lotes { get; set; } = Array.Empty<LotesDto>();
    public PalestranteDto[] Palestrantes { get; set; } = Array.Empty<PalestranteDto>();
}
