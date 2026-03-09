namespace PGRGuidesServer.Interfaces;

public interface IProfileService {
    Task<bool> ChangeProfileImageAsync(string userId, string newImagePath);
}