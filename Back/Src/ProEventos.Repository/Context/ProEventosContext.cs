using Microsoft.EntityFrameworkCore;
using ProEventos.Domain.Models;

namespace ProEventos.Repository.Context
{
    public class ProEventosContext : DbContext
    {
        public ProEventosContext(DbContextOptions<ProEventosContext> options) : base(options) { }

        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Lote> Lotes { get; set; }
        public DbSet<Palestrante> Palestrantes { get; set; }
        public DbSet<PalestranteEvento> PalestrantesEventos { get; set; }
        public DbSet<RedeSocial> RedesSociais { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuração decimal para Preço do Lote
            modelBuilder.Entity<Lote>()
                .Property(l => l.Preco)
                .HasColumnType("decimal(18,2)");

            // Chave composta para a tabela N:N PalestranteEvento
            modelBuilder.Entity<PalestranteEvento>()
                .HasKey(pe => new { pe.EventoId, pe.PalestranteId });

            // Evento -> Lotes (1:N)
            modelBuilder.Entity<Evento>()
                .HasMany(e => e.Lotes)
                .WithOne(l => l.Evento)
                .HasForeignKey(l => l.IdEvento)
                .OnDelete(DeleteBehavior.Cascade);

            // Evento -> RedesSociais (1:N)
            modelBuilder.Entity<Evento>()
                .HasMany(e => e.RedesSociais)
                .WithOne(r => r.Evento)
                .HasForeignKey(r => r.EventoId)
                .OnDelete(DeleteBehavior.Cascade);

            // Palestrante -> PalestranteEvento (1:N)
            modelBuilder.Entity<Palestrante>()
                .HasMany(p => p.PalestrantesEventos)
                .WithOne(pe => pe.Palestrante)
                .HasForeignKey(pe => pe.PalestranteId)
                .OnDelete(DeleteBehavior.Cascade);

            // PalestranteEvento -> Evento (N:1)
            modelBuilder.Entity<PalestranteEvento>()
                .HasOne(pe => pe.Evento)
                .WithMany(e => e.PalestrantesEventos)
                .HasForeignKey(pe => pe.EventoId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
