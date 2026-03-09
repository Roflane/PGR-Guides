using Microsoft.AspNetCore.Mvc;
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
    [HttpGet("image/{userId}")]
    public async Task<string?> GetProfileImage(string userId) {
        return await profileService.GetProfileImage(userId);
    }
    
    /// <summary>
    /// Asynchronously changes profile image
    /// </summary>
    [HttpPut]
    public async Task<ApplicationUser> ChangeProfileImage(string userId, string newStaticImagePath) {
        return await profileService.ChangeProfileImageAsync(userId, newStaticImagePath);
    }
}