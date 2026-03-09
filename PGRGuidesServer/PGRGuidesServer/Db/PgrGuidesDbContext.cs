using Microsoft.EntityFrameworkCore;
using PGRGuidesServer.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace PGRGuidesServer.Db;

public class PgrGuidesDbContext(DbContextOptions<PgrGuidesDbContext> options) : IdentityDbContext<ApplicationUser>(options) {
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    
    protected override void OnModelCreating(ModelBuilder builder) {
        base.OnModelCreating(builder);
        
        builder.Entity<RefreshToken>(entity => {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.JwtId).IsUnique();
            entity.HasOne<ApplicationUser>()
                .WithMany()
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}