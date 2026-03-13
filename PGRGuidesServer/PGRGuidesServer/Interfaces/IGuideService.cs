using PGRGuidesServer.DTO;
using PGRGuidesServer.Models;

namespace PGRGuidesServer.Interfaces;

public interface IGuideService {
    Task<List<GuideDto>> GetAllAsync();
    Task<GuideDto> CreateAsync(string title, string author, string description, string staticImagePath);
}