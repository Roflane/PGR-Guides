using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PGRGuidesServer.DTO;
using PGRGuidesServer.ApiResponse;
using PGRGuidesServer.Interfaces;

namespace PGRGuidesServer.Controllers;

/// <summary>
/// Controller for User Roles
/// </summary>
/// <param name="roleService">IRoleService</param>
[Route("api/[controller]")]
[ApiController]
public class UserRolesController(IRoleService roleService) : ControllerBase {
    /// <summary>
    /// Asynchronously gets all users with roles
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<UserWithRolesDto>>>> GetAll() {
        return Ok(ApiResponse<IEnumerable<UserWithRolesDto>>.SuccessResponse(await roleService.GetAllAsync()));
    }

    /// <summary>
    /// Asynchronously gets roles of user
    /// </summary>
    /// <returns></returns>
    [HttpGet("{userId}/roles")]
    public async Task<ActionResult<ApiResponse<UserWithRolesDto>>> GetRoles(string userId) {
        return Ok(ApiResponse<UserWithRolesDto>.SuccessResponse(await roleService.GetRolesAsync(userId)));
    }

    /// <summary>
    /// Asynchronously assigns role to user
    /// </summary>
    /// <returns></returns>
    [HttpPost("{userId}/roles")]
    public async Task<ActionResult<ApiResponse<UserWithRolesDto>>> AssignRole([FromBody] AssignRoleDto assignRoleDto) {
        return Ok(ApiResponse<UserWithRolesDto>.SuccessResponse(await roleService.AssignRole(assignRoleDto)));
    }   
    
    /// <summary>
    /// Asynchronously gets all users with roles
    /// </summary>
    /// <returns></returns>
    [HttpDelete("{userId}/roles/{roleName}")]
    public async Task<ActionResult<ApiResponse<UserWithRolesDto>>> RemoveRole([FromBody] RemoveRoleDto removeRoleDto) {
        return Ok(ApiResponse<UserWithRolesDto>.SuccessResponse(await roleService.RemoveRole(removeRoleDto)));
    }
}
