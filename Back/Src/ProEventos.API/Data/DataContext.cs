using Back.Src.ProEventos.API.Model;
using Microsoft.EntityFrameworkCore;

namespace ProEventos.API;

public class DataContext:DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options){ }
    public DbSet<Evento> Eventos { get; set; }
}
