using Microsoft.AspNetCore.Mvc;
using PGRGuidesServer.DTO;
using PGRGuidesServer.Interfaces;
using PGRGuidesServer.Models;

namespace PGRGuidesServer.Controllers;

/// <summary>
/// Controller for Guides
/// </summary>
/// <param name="guideService"></param>
[ApiController]
[Route("api/[controller]")]
public class GuideController(IGuideService guideService) : ControllerBase {
    /// <summary>
    /// Asynchronously gets all guides
    /// </summary>
    /// <returns></returns>
    [HttpGet("all")]
    public async Task<List<Guide>> GetAll() { 
        return await guideService.GetAllAsync();
    }

    /// <summary>
    /// Asynchronously creates guide
    /// </summary>
    /// <param name="guideDto"></param>
    /// <returns></returns>
    [HttpPost("create")]
    public async Task<Guide> Create([FromBody] GuideDto guideDto) {
        return await guideService.CreateAsync(guideDto);
    }
    
    /// <summary>
    /// Asynchronously deletes guide
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpDelete("delete:{id}")]
    public async Task<bool> Delete([FromBody] int id) {
        return await guideService.DeleteAsync(id);
    }
}