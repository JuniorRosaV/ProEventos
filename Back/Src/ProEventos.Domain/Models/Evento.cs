using System;
using System.Collections.Generic;

namespace ProEventos.Domain.Models
{
    public class Evento
    {
        public int Id { get; set; }
        public required string Local { get; set; }
        public required DateTime DataEvento { get; set; }
        public required string Tema { get; set; }
        public required int QtdPessoas { get; set; }
        public required string ImagemUrl { get; set; }
        public string Telefone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public ICollection<Lote> Lotes { get; set; } = new List<Lote>();
        public ICollection<RedeSocial>? RedesSociais { get; set; }
        public ICollection<PalestranteEvento>? PalestrantesEventos { get; set; }
    }
}
