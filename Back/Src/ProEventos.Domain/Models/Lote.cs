namespace ProEventos.Domain.Models;

public class Lote
{
    public int Id { get; set; }
    public required string Nome { get; set; }
    public required decimal Preco { get; set; }
    public required DateTime DataInicio { get; set; }
    public required DateTime DataFim { get; set; }
    public required int Quantidade { get; set; }
    public int? EventoId { get; set; }
}
