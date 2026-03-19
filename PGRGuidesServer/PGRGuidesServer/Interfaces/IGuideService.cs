using PGRGuidesServer.DTO;
using PGRGuidesServer.Models;

namespace PGRGuidesServer.Interfaces;

public interface IGuideService {
    Task<List<Guide>> GetAllAsync();
    Task<Guide> CreateAsync(GuideDto guideDto);
    Task<bool> DeleteAsync(int id);
}