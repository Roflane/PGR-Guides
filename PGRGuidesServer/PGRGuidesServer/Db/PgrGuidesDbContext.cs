using Microsoft.EntityFrameworkCore;

namespace PGRGuidesServer.Db;

public class PgrGuidesDbContext : DbContext {
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        optionsBuilder.UseNpgsql("Host=localhost;Database=pgr_guides;Username=postgres;Password=");
    }   
}