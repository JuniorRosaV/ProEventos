using ProEventos.Domain.Models;

namespace ProEventos.Service.Dtos;

public class EventoDto
{
    public string Local { get; set; } = string.Empty;
    public string DataEvento { get; set; } = string.Empty;
    public string Tema { get; set; } = string.Empty;
    public int QtdPessoas { get; set; }
    public string ImagemUrl { get; set; } = string.Empty;
    public string Telefone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;

    public Lote[] Lotes { get; set; } = Array.Empty<Lote>();
}
