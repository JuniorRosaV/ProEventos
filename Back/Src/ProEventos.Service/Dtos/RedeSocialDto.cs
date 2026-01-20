namespace ProEventos.Service.Dtos;
public class RedeSocialDto
{
    public int Id { get; set; }
    public required string Nome { get; set; }
    public required string Url { get; set; }
    public int? EventoId { get; set; }
    public int? PalestranteId { get; set; }

}
