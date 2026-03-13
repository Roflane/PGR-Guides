using Microsoft.AspNetCore.Mvc;
using PGRGuidesServer.DTO;
using PGRGuidesServer.Interfaces;
using PGRGuidesServer.ApiResponse;

namespace PGRGuidesServer.Controllers;

/// <summary>
/// Controller for Auth
/// </summary>
/// <param name="authService"></param>
[Route("api/[controller]")]
[ApiController]
public class AuthController(IAuthService authService) : ControllerBase {
    /// <summary>
    /// Async registration
    /// </summary>
    /// <param name="registerDto"></param>
    /// <returns>ActionResult of ApiResponse`AuthResponseDto`</returns>
    [HttpPost("register")]
    public async Task<ActionResult<ApiResponse<AuthResponseDto>>> Register([FromBody] RegisterDto registerDto) {
        var result = await authService.RegisterAsync(registerDto);
        // Console.WriteLine("=== Registration Debug ===");
        // Console.WriteLine($"Login: '{registerDto.Login}'");
        // Console.WriteLine($"Email: '{registerDto.Email}'");
        // Console.WriteLine($"Password length: {registerDto.Password?.Length ?? 0}");
        // Console.WriteLine($"ConfirmPassword length: {registerDto.ConfirmPassword?.Length ?? 0}");
        // Console.WriteLine("==========================");
        return Ok(ApiResponse<AuthResponseDto>.SuccessResponse(result, "User registered successfully"));
    }
    
    /// <summary>
    /// Async login
    /// </summary>
    /// <param name="loginDto"></param>
    /// <returns>ActionResult of ApiResponse`AuthResponseDto`</returns>
    [HttpPost("login")]
    public async Task<ActionResult<ApiResponse<AuthResponseDto>>> Login([FromBody] LoginDto loginDto) {
        var result = await authService.LoginAsync(loginDto);
        return Ok(ApiResponse<AuthResponseDto>.SuccessResponse(result, "Login successfully"));
    }

    /// <summary>
    /// Async token refresh
    /// </summary>
    /// <param name="refreshTokenRequest"></param>
    /// <returns>ActionResult of ApiResponse`AuthResponseDto`</returns>
    [HttpPost("refresh")]
    public async Task<ActionResult<ApiResponse<AuthResponseDto>>> Refresh([FromBody] RefreshTokenRequestDto refreshTokenRequest) {
        var result = await authService.RefreshTokenAsync(refreshTokenRequest);
        return Ok(ApiResponse<AuthResponseDto>.SuccessResponse(result, "Token refreshed successfully"));
    }

    /// <summary>
    /// Async token revocation
    /// </summary>
    /// <param name="refreshToken"></param>
    /// <returns>Task of ActionResult</returns>
    [HttpPost("revoke")]
    public async Task<ActionResult> Revoke([FromBody] string refreshToken) {
        await authService.RevokeRefreshTokenAsync(refreshToken);
        return Ok(ApiResponse<AuthResponseDto>.SuccessResponse("Refresh token revoked"));
    }
}
