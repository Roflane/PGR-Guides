using Microsoft.EntityFrameworkCore;
using PGRGuidesServer.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace PGRGuidesServer.Db;

public class PgrGuidesDbContext(DbContextOptions<PgrGuidesDbContext> options) : IdentityDbContext<ApplicationUser>(options) {
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    public DbSet<Guide> Guides => Set<Guide>();
    
    
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

        // builder.Entity<Guide>(entity => {
        //     entity.HasKey(e => e.Id);
        //
        //     // entity.HasOne(g => g.User)
        //     //     .WithMany(u => u.Guides)
        //     //     .HasForeignKey(g => g.UserId)
        //     //     .OnDelete(DeleteBehavior.Cascade); 
        //
        //     // entity.HasIndex(g => g.CreatedAt);
        //     // entity.HasIndex(g => g.Author);
        //
        //     entity.Property(g => g.Title)
        //         .IsRequired()
        //         .HasMaxLength(200);
        //     
        //     entity.Property(g => g.Author)
        //         .IsRequired()
        //         .HasMaxLength(100);
        //     
        //     entity.Property(g => g.Description)
        //         .HasMaxLength(1000); 
        // });
        //
        // builder.Entity<ApplicationUser>(entity => {
        //     entity.HasIndex(u => u.Login).IsUnique();
        //     entity.HasIndex(u => u.CreatedAt);
        // });
    }
}