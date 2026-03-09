using PGRGuidesServer.Db;
using PGRGuidesServer.Interfaces;

namespace PGRGuidesServer.Services;

public class ProfileService(PgrGuidesDbContext ctx) : IProfileService {
    public async Task<bool> ChangeProfileImageAsync(string userId, string newImagePath) {
        var user = await ctx.Users.FindAsync(userId);
        if (user == null)
            throw new InvalidOperationException("User not found");
        
        
        return true;
    }
}