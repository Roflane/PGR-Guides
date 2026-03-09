using PGRGuidesServer.Db;
using PGRGuidesServer.Interfaces;
using PGRGuidesServer.Models;

namespace PGRGuidesServer.Services;

public class ProfileService(PgrGuidesDbContext ctx) : IProfileService {
    public async Task<string?> GetProfileImage(string userId) {
        var user = await ctx.Users.FindAsync(userId);
        if (user == null) return null;
        return user.StaticImagePath;
    }
    
    public async Task<ApplicationUser> ChangeProfileImageAsync(string userId, string newStaticImagePath) {
        var user = await ctx.Users.FindAsync(userId);
        if (user == null)
            throw new InvalidOperationException("User not found");
        
        user.StaticImagePath = newStaticImagePath;
        await ctx.SaveChangesAsync();
        return user;
    }
}