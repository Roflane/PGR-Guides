using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PGRGuidesServer.Config;
using PGRGuidesServer.Db;
using PGRGuidesServer.DTO;
using PGRGuidesServer.Enums;
using PGRGuidesServer.Interfaces;
using PGRGuidesServer.Models;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace PGRGuidesServer.Services;

public class AuthService(
    PgrGuidesDbContext ctx, 
    UserManager<ApplicationUser> userManager,
    JwtConfig config
) : IAuthService {
    private const string RefreshTokenType = "refresh";
    
    private async Task<(RefreshToken entity, string jwt)> CreateRefreshTokenJwtAsync(string userId, int expirationDays) {
        var jti = Guid.NewGuid().ToString();
        var expiresAt = DateTime.UtcNow.AddDays(expirationDays);

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.RefreshTokenSecretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim> {
            new (ClaimTypes.NameIdentifier, userId),
            new (JwtRegisteredClaimNames.Jti, jti),
            new (JwtRegisteredClaimNames.Sub, userId),
            new ("token_type", RefreshTokenType)
        };

        var token = new JwtSecurityToken(
            issuer: config.Issuer,
            audience: config.Audience,
            claims: claims,
            expires: expiresAt,
            signingCredentials: credentials
        );
        var entity = new RefreshToken {
            JwtId = jti,
            UserId = userId,
            ExpiresAt = expiresAt,
            CreatedAt = DateTime.UtcNow
        };

        ctx.RefreshTokens.Add(entity);
        await ctx.SaveChangesAsync();

        var jwtString = new JwtSecurityTokenHandler().WriteToken(token);
        return (entity, jwtString);
    }
    
    private async Task<AuthResponseDto> GenerateTokenAsync(ApplicationUser user) {
        // Console.WriteLine("===== GENERATE TOKEN =====");
        // Console.WriteLine($"JwtConfig is null: {config == null}");
        // if (config != null) {
        //     Console.WriteLine($"SecretKey is null: {string.IsNullOrEmpty(config.SecretKey)}");
        //     Console.WriteLine($"SecretKey length: {config.SecretKey?.Length ?? 0}");
        // }
        
        if (config == null || string.IsNullOrEmpty(config.SecretKey)) {
            throw new InvalidOperationException(
                $"JWT SecretKey is not configured. Config null: {config == null}");
        }
        
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.SecretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var roles = await userManager.GetRolesAsync(user);

        var claims = new List<Claim> {
            new (ClaimTypes.NameIdentifier, user.Id),
            new (ClaimTypes.Name, user.UserName!),
            new (ClaimTypes.Email, user.Email!),
            new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N"))
        };

        foreach (var role in roles) {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var token = new JwtSecurityToken(
            issuer: config.Issuer,
            audience: config.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(config.ExpirationInMinutes),
            signingCredentials: credentials
        );

        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
        var (refreshToken, jwt) = await CreateRefreshTokenJwtAsync(user.Id, config.RefreshTokenExpirationInDays);
        return new AuthResponseDto {
            Id = user.Id,
            Login = user.Login ?? user.UserName!,
            StaticImagePath = user.StaticImagePath,
            CreatedAt = user.CreatedAt.ToString().Split(" ")[0],
            AccessToken = tokenString,
            ExpiresAt = DateTime.UtcNow.AddMinutes(config.ExpirationInMinutes),
            RefreshToken = jwt,
            RefreshTokenExpiresAt = refreshToken.ExpiresAt,
            Roles = roles
        };
    }
    
    public async Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto) {
        var existingUser = await userManager.FindByEmailAsync(registerDto.Email);
        if (existingUser is not null) {
            throw new InvalidOperationException("User with this email already exists");
        }

        var user = new ApplicationUser {
            UserName = registerDto.Login,
            StaticImagePath = DefaultUserConfig.DefaultImagePath,
            Email = registerDto.Email,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        var result = await userManager.CreateAsync(user, registerDto.Password);
        if (!result.Succeeded) {
            var errors = string.Join(",", result.Errors.Select(e => e.Description));
            throw new InvalidOperationException($"User creation failed: {errors}");
        }

        await userManager.AddToRoleAsync(user, nameof(ERole.User));
        return await GenerateTokenAsync(user);
    }

    public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto) {
        var user = await userManager.Users
            .FirstOrDefaultAsync(u => u.UserName == loginDto.Login);
    
        if (user is null) {
            throw new UnauthorizedAccessException("Invalid login or password");
        }

        var isValidPassword = await userManager.CheckPasswordAsync(user, loginDto.Password);
        if (!isValidPassword) {
            throw new UnauthorizedAccessException("Invalid login or password");
        }
    
        Console.WriteLine($"User created at: {user.CreatedAt}");
        return await GenerateTokenAsync(user);
    }

    private static string GetJtiFromRefreshToken(string refreshJwt) {
        var handler = new JwtSecurityTokenHandler();

        if (!handler.CanReadToken(refreshJwt)) return string.Empty;

        var jwt = handler.ReadJwtToken(refreshJwt);
        return jwt.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti)?.Value ?? string.Empty;
    }
    
    private (ClaimsPrincipal principal, string jti) ValidateRefreshJwtAndGetJti(string refreshToken, bool validateLifeTime = true) {
        var handler = new JwtSecurityTokenHandler();
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.RefreshTokenSecretKey));

        var principal = handler.ValidateToken(refreshToken, new TokenValidationParameters {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = key,
            ValidateIssuer = true,
            ValidIssuer = config.Issuer,
            ValidateAudience = true,
            ValidAudience = config.Audience,
            ValidateLifetime = validateLifeTime,
            ClockSkew = TimeSpan.Zero
        }, out var validatedToken);

        if (validatedToken is not JwtSecurityToken jwt)
            throw new UnauthorizedAccessException("Invalid refresh token");

        var tokenType = jwt.Claims.FirstOrDefault(x => x.Type == "token_type")?.Value;
        if (tokenType != RefreshTokenType)
            throw new UnauthorizedAccessException("Invalid refresh token");

        var jti = jwt.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti)?.Value
                  ?? throw new UnauthorizedAccessException("Invalid refresh token");
        return (principal, jti);
    }
    
    public async Task<AuthResponseDto> RefreshTokenAsync(RefreshTokenRequestDto refreshTokenRequest) {
        var (principal, jti) = ValidateRefreshJwtAndGetJti(refreshTokenRequest.RefreshToken);

        var storedToken = await ctx.RefreshTokens.FirstOrDefaultAsync(rt => rt.JwtId == jti);

        if (storedToken is null)
            throw new UnauthorizedAccessException("Invalid refresh token");

        if(!storedToken.IsActive)
            throw new UnauthorizedAccessException("Refresh token has been revoked or expired");

        var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await userManager.FindByIdAsync(userId!);
        if(user is null)
            throw new UnauthorizedAccessException("User not found");

        storedToken.RevokedAt = DateTime.UtcNow;

        var newToken = await GenerateTokenAsync(user);
        var newStored = await ctx.RefreshTokens
            .FirstOrDefaultAsync(rt => rt.JwtId == GetJtiFromRefreshToken(newToken.RefreshToken));
        if (newStored is not null) storedToken.ReplacedByJwtId = newStored.JwtId;

        await ctx.SaveChangesAsync();
        return newToken;
    }

    public async Task RevokeRefreshTokenAsync(string refreshToken) {
        var jti = ValidateRefreshJwtAndGetJti(refreshToken, validateLifeTime: false);
        
        var storedToken = await ctx.RefreshTokens.FirstOrDefaultAsync(rt => rt.JwtId == jti.jti);
        if (storedToken is null || !storedToken.IsActive) return;

        storedToken.RevokedAt = DateTime.UtcNow;
        await ctx.SaveChangesAsync();
    }
}