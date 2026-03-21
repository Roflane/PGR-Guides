using PGRGuidesServer.Db;
using PGRGuidesServer.Interfaces;
using PGRGuidesServer.Models;

namespace PGRGuidesServer.Services;

public class ProfileService(PgrGuidesDbContext ctx) : IProfileService {
    public async Task<List<string>> GetAllAsync() {
        return await Task.Run(() => 
            Directory.GetFiles("wwwroot\\chibi")
                .Select(f => "/chibi/" + Path.GetFileName(f))
                .ToList()
        );
    }

    public async Task<string?> GetProfileImageAsync(string userId) {
        var user = await ctx.Users.FindAsync(userId);
        if (user == null) return null;
        return user.StaticImagePath;
    }

    public async Task<ApplicationUser> ChangeProfileImageAsync(string userId, string newStaticImagePath) {
        var user = await ctx.Users.FindAsync(userId);
        if (user == null)
            throw new InvalidOperationException("User not found");

        var allAvatars = await GetAllAsync();
        if (!allAvatars.Contains(newStaticImagePath)) 
            throw new InvalidOperationException("Invalid avatar path");
        
        user.StaticImagePath = newStaticImagePath;
        user.UpdatedAt = DateTime.UtcNow;
        await ctx.SaveChangesAsync();
        return user;
    }
}