using Microsoft.AspNetCore.Mvc;
using PGRGuidesServer.DTO;
using PGRGuidesServer.Enums;
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
    /// <param name="guideCreateDto"></param>
    /// <returns></returns>
    [HttpPost("create")]
    public async Task<Guide> Create([FromBody] GuideCreateDto guideCreateDto) {
        if (guideCreateDto == null) 
            throw new ArgumentNullException(nameof(guideCreateDto));
    
        if (guideCreateDto.GuideDto == null)
            throw new ArgumentNullException(nameof(guideCreateDto.GuideDto));
        
        bool createImmediately = guideCreateDto.Roles
            .Any(r => r == nameof(ERole.ADMIN));
    
        return await guideService.CreateAsync(createImmediately, guideCreateDto.GuideDto);
    }
    
    /// <summary>
    /// Asynchronously changes guide status
    /// </summary>
    /// <param name="guideChangeStatusDto"></param>
    /// <returns></returns>
    [HttpPut("change-status")]
    public async Task<bool> ChangeStatus([FromBody] GuideChangeStatusDto guideChangeStatusDto) {
        return await guideService.ChangeStatusAsync(guideChangeStatusDto);
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