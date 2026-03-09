using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PGRGuidesServer.DTO;
using PGRGuidesServer.Models;
using PGRGuidesServer.ApiResponse;

namespace PGRGuidesServer.Controllers;

/// <summary>
/// Controller for User Roles
/// </summary>
/// <param name="userManager"></param>
[Route("api/[controller]")]
[ApiController]
public class UserRolesController(UserManager<ApplicationUser> userManager) : ControllerBase {
    /// <summary>
    /// Asynchronously gets all users with roles
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<UserWithRolesDto>>>> GetAll() {
        var users = userManager.Users.OrderBy(u => u.Email).ToList();
        var dtoList = new List<UserWithRolesDto>();
        foreach (var user in users) {
            var roles = await userManager.GetRolesAsync(user);
            dtoList.Add(new UserWithRolesDto {
                Id = user.Id,
                Login = user.UserName!,
                Email = user.Email!,
                Roles = roles.ToList()
            });
        }
        return Ok(ApiResponse<IEnumerable<UserWithRolesDto>>.SuccessResponse(dtoList));
    }

    /// <summary>
    /// Asynchronously gets all users with roles
    /// </summary>
    /// <returns></returns>
    [HttpGet("{userId}/roles")]
    public async Task<ActionResult<ApiResponse<UserWithRolesDto>>> GetRoles(string userId) {
        var user = await userManager.FindByIdAsync(userId);
        if (user is null) return NotFound("User not found");
        var roles = await userManager.GetRolesAsync(user);
        return Ok(ApiResponse<UserWithRolesDto>.SuccessResponse(new UserWithRolesDto {
            Id = user.Id,
            Login = user.UserName!,
            Email = user.Email!,
            Roles = roles.ToList()
        }));
    }

    /// <summary>
    /// Asynchronously gets all users with roles
    /// </summary>
    /// <returns></returns>
    [HttpPost("{userId}/roles")]
    public async Task<ActionResult<ApiResponse<UserWithRolesDto>>> AssignRole(string userId, [FromBody] string role) {
        var roleName = role.Trim();
        if (string.IsNullOrEmpty(roleName)) return BadRequest();
        var user = await userManager.FindByIdAsync(userId);
        if (user is null) return BadRequest();
        var result = await userManager.AddToRoleAsync(user, role);
        if (!result.Succeeded) return BadRequest();
        var roles = await userManager.GetRolesAsync(user);
        return Ok(ApiResponse<UserWithRolesDto>.SuccessResponse(new UserWithRolesDto {
            Id = user.Id,
            Login = user.UserName!,
            Email = user.Email!,
            Roles = roles.ToList()
        }));
    }   
    
    /// <summary>
    /// Asynchronously gets all users with roles
    /// </summary>
    /// <returns></returns>
    [HttpDelete("{userId}/roles/{roleName}")]
    public async Task<ActionResult<ApiResponse<UserWithRolesDto>>> RemoveRole(string userId, string roleName) {
        roleName = roleName.Trim();
        if (string.IsNullOrEmpty(roleName)) return BadRequest();
        var user = await userManager.FindByIdAsync(userId);
        if (user is null) return BadRequest();
        if (!await userManager.IsInRoleAsync(user, roleName)) return BadRequest();
        var result = await userManager.RemoveFromRoleAsync(user, roleName);
        if (!result.Succeeded) return BadRequest();
        var roles = await userManager.GetRolesAsync(user);
        return Ok(ApiResponse<UserWithRolesDto>.SuccessResponse(new UserWithRolesDto {
            Id = user.Id,
            Login = user.UserName!,
            Email = user.Email!,
            Roles = roles.ToList()
        }));
    }
}
