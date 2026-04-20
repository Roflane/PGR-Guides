using PGRGuidesServer.Models;

namespace PGRGuidesServer.Interfaces;

public interface IProfileService {
    Task<List<Chibi>> GetAllAsync();
    Task<string?> GetProfileImageAsync(string userId);
    Task<ApplicationUser> ChangeProfileImageAsync(string userId, string newStaticImagePath);
}