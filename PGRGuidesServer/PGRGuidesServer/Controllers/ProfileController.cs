using Microsoft.AspNetCore.Mvc;
using PGRGuidesServer.DTO;
using PGRGuidesServer.Interfaces;
using PGRGuidesServer.Models;

namespace PGRGuidesServer.Controllers;

/// <summary>
/// Controller for User Profile
/// </summary>
/// <param name="profileService"></param>
[Route("api/[controller]")]
[ApiController]
public class ProfileController(IProfileService profileService) : ControllerBase {
    /// <summary>
    /// Asynchronously gets all profile images
    /// </summary>
    /// <returns></returns>
    [HttpGet("image/all")]
    public async Task<List<string>> GetAll() {
        return await profileService.GetAllAsync();
    }
    
    /// <summary>
    /// Asynchronously gets profile image path
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    [HttpGet("image/{userId}")]
    public async Task<string?> GetProfileImage(string userId) {
        return await profileService.GetProfileImageAsync(userId);
    }
    
    /// <summary>
    /// Asynchronously changes profile image
    /// </summary>
    [HttpPut("image/")]
    public async Task<ApplicationUser> ChangeProfileImage([FromBody] ChangeProfileImageDto changeProfileImageDto) {
        return await profileService.ChangeProfileImageAsync(changeProfileImageDto.userId, changeProfileImageDto.newStaticImagePath);
    }
}