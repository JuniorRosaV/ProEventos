using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using ProEventos.Repository.Context;

namespace ProEventos.API.Data
{
    public class ProEventosContextFactory : IDesignTimeDbContextFactory<ProEventosContext>
    {
        public ProEventosContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ProEventosContext>();
            optionsBuilder.UseSqlServer(
                "Server=(localdb)\\MSSQLLocalDB;Database=NovoProEventos;User Id=sa;Password=@Juniorrosa10;TrustServerCertificate=True;");

            return new ProEventosContext(optionsBuilder.Options);
        }
    }
}
