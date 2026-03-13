using Microsoft.AspNetCore.Mvc;
using PGRGuidesServer.DTO;
using PGRGuidesServer.Interfaces;

namespace PGRGuidesServer.Controllers;

/// <summary>
/// Controller for Guides
/// </summary>
/// <param name="guideServicee"></param>
[ApiController]
[Route("api/[controller]")]
public class GuideController(IGuideService guideService) : ControllerBase {
    /// <summary>
    /// Asynchronously gets all guides
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public async Task<List<GuideDto>> GetAll() { 
        return await guideService.GetAllAsync();
    }

    /// <summary>
    /// Asynchronously creates guide
    /// </summary>
    /// <param name="guideDto"></param>
    /// <returns></returns>
    [HttpPost]
    public async Task<GuideDto> Create([FromBody] GuideDto guideDto) {
        return await guideService.CreateAsync(guideDto.Title, guideDto.Author, guideDto.Description, guideDto.StaticImagePath);
    }
}