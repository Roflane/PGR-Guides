using PGRGuidesServer.DTO;
using PGRGuidesServer.Models;

namespace PGRGuidesServer.Interfaces;

public interface IGuideService {
    Task<List<Guide>> GetAllAsync();
    Task<Guide> CreateAsync(bool createImmediately, GuideDto guideDto);
    Task<bool> ChangeStatusAsync(GuideChangeStatusDto guideChangeStatusDto);
    Task<bool> DeleteAsync(int id);
}