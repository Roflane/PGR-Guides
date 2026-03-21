using Microsoft.AspNetCore.Mvc;
using PGRGuidesServer.DTO;
using PGRGuidesServer.ApiResponse;

namespace PGRGuidesServer.Interfaces;

public interface IRoleService {
    Task<List<UserWithRolesDto>> GetAllAsync();
    Task<UserWithRolesDto> GetRolesAsync(string userId);
    Task<UserWithRolesDto> AssignRole(AssignRoleDto assignRoleDto);
    Task<UserWithRolesDto> RemoveRole(RemoveRoleDto removeRoleDto);
}