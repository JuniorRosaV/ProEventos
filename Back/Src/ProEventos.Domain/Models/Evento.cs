using System;
using System.Collections.Generic;

namespace ProEventos.Domain.Models
{
    public class Evento
    {
        public int Id { get; set; }
        public string Tema { get; set; }
        public string Local { get; set; }
        public DateTime DataEvento { get; set; }
        public int QtdPessoas { get; set; }
        public string ImagemUrl { get; set; }
        public ICollection<Lote> Lotes { get; set; } = new List<Lote>();
        public IEnumerable<RedeSocial>? RedesSociais { get; set; }
        public IEnumerable<PalestranteEvento>? PalestrantesEventos { get; set; }
    }
}
