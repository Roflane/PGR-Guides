using System.Text.Json;
using PGRGuidesServer.Config;
using PGRGuidesServer.Db;
using PGRGuidesServer.Interfaces;
using PGRGuidesServer.Models;

namespace PGRGuidesServer.Services;

public class ProfileService(PgrGuidesDbContext ctx) : IProfileService {
    public async Task<List<Chibi>> GetAllAsync() {
        var json = await File.ReadAllTextAsync("wwwroot/chibi_all.json");
        var options = new JsonSerializerOptions {
            PropertyNameCaseInsensitive = true
        };
        var chibiList = JsonSerializer.Deserialize<List<Chibi>>(json, options);
    
        if (chibiList != null) {
            foreach (var chibi in chibiList) {
                if (!string.IsNullOrEmpty(chibi.Image)) {
                    var fileName = Path.GetFileName(chibi.Image);
                    chibi.Image = ApiConfig.S3BaseUrl + "/chibi/" + fileName;
                }
            }
        }
    
        return chibiList ?? new List<Chibi>();
    }

    public async Task<string?> GetProfileImageAsync(string userId) {
        var user = await ctx.Users.FindAsync(userId);
        if (user == null) return null;
        return ApiConfig.S3BaseUrl + user.StaticImagePath;
    }

    public async Task<ApplicationUser> ChangeProfileImageAsync(string userId, string newStaticImagePath) {
        var user = await ctx.Users.FindAsync(userId);
        if (user == null)
            throw new InvalidOperationException("User not found");
        
        user.StaticImagePath = newStaticImagePath;
        user.UpdatedAt = DateTime.UtcNow;
        await ctx.SaveChangesAsync();
        return user;
    }
}