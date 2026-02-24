using PGRGuidesServer.DTO;
using PGRGuidesServer.Interfaces;

namespace PGRGuidesServer.Services;

public class AuthService : IAuthService {
    public Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto) {
        throw new NotImplementedException();
    }

    public Task<AuthResponseDto> LoginAsync(LoginDto loginDto) {
        throw new NotImplementedException();
    }

    public Task<AuthResponseDto> RefreshTokenAsync(RefreshTokenRequestDto refreshTokenRequest) {
        throw new NotImplementedException();
    }

    public Task RevokeRefreshTokenAsync(string refreshToken) {
        throw new NotImplementedException();
    }
}