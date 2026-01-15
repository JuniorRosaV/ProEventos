using System;
using System.Collections.Generic;

namespace ProEventos.Domain.Models
{
    public class Evento
    {
        public int Id { get; set; }
        public string Local { get; set; }
        public DateTime? DataEvento { get; set; }
        public string Tema { get; set; }
        public int QtdPessoas { get; set; }
        public string ImagemUrl { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public ICollection<Lote> Lotes { get; set; } = new List<Lote>();
        public ICollection<RedeSocial>? RedesSociais { get; set; }
        public ICollection<PalestranteEvento>? PalestrantesEventos { get; set; }
    }
}
