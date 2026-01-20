namespace ProEventos.Service.Dtos;

public class LotesDto
{
    public required string Nome { get; set; }
    public required decimal Preco { get; set; }
    public required string DataInicio { get; set; }
    public required string DataFim { get; set; }
    public required int Quantidade { get; set; }
    public required int? EventoId { get; set; }
}
