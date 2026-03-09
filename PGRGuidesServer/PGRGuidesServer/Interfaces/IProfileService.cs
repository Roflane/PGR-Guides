using PGRGuidesServer.Models;

namespace PGRGuidesServer.Interfaces;

public interface IProfileService {
    Task<string?> GetProfileImage(string userId);
    Task<ApplicationUser> ChangeProfileImageAsync(string userId, string newStaticImagePath);
}