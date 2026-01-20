namespace ProEventos.Domain.Models;

public class PalestranteEvento
{
    public int EventoId { get; set; }
    public required Evento Evento { get; set; }
    public int PalestranteId { get; set; }
    public required Palestrante Palestrante { get; set; }

}
