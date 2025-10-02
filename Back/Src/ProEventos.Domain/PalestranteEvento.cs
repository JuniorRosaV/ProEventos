namespace ProEventos.Domain;

public class PalestranteEvento
{
    public int EventoId { get; set; }
    public Evento Eventos { get; set; }
    public int PalestranteId { get; set; }
    public Palestrante Palestrantes { get; set; }

}
