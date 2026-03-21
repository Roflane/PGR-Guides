using Microsoft.AspNetCore.Identity;
using PGRGuidesServer.DTO;
using PGRGuidesServer.Interfaces;
using PGRGuidesServer.Models;

namespace PGRGuidesServer.Services;

public class RoleService(UserManager<ApplicationUser> userManager) : IRoleService {
    public async Task<List<UserWithRolesDto>> GetAllAsync() {
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
        return dtoList;
    }

    public async Task<UserWithRolesDto> GetRolesAsync(string userId) {
        var user = await userManager.FindByIdAsync(userId);
        if (user is null) return null!;
        var roles = await userManager.GetRolesAsync(user);
        return new UserWithRolesDto {
            Id = user.Id,
            Login = user.UserName!,
            Email = user.Email!,
            Roles = roles.ToList()
        };
    }

    public async Task<UserWithRolesDto> AssignRole(AssignRoleDto assignRoleDto) {
        var role = assignRoleDto.Role.Trim();
        if (string.IsNullOrEmpty(role)) return null!;
        var user = await userManager.FindByIdAsync(assignRoleDto.UserId);
        if (user is null) return null!;
        var result = await userManager.AddToRoleAsync(user, assignRoleDto.Role);
        if (!result.Succeeded) return null!;
        var roles = await userManager.GetRolesAsync(user);
        return new UserWithRolesDto {
            Id = user.Id,
            Login = user.UserName!,
            Email = user.Email!,
            Roles = roles.ToList()
        };
    }

    public async Task<UserWithRolesDto> RemoveRole(RemoveRoleDto removeRoleDto) {
        var role = removeRoleDto.Role.Trim();
        if (string.IsNullOrEmpty(role)) return null!;
        var user = await userManager.FindByIdAsync(removeRoleDto.UserId);
        if (user is null) return null!;
        if (!await userManager.IsInRoleAsync(user, role)) return null!;
        var result = await userManager.RemoveFromRoleAsync(user, role);
        if (!result.Succeeded) return null!;
        var roles = await userManager.GetRolesAsync(user);
        return new UserWithRolesDto {
            Id = user.Id,
            Login = user.UserName!,
            Email = user.Email!,
            Roles = roles.ToList()
        };
    }
}