namespace PGRGuidesServer.DTO;

public class AuthResponseDto {
    public string Login { get; set; } = string.Empty;
    public string AccessToken { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
    public DateTimeOffset ExpiresAt { get; set; }
    public DateTimeOffset RefreshTokenExpiresAt { get; set; }

    public IEnumerable<string> Roles { get; set; } = new List<string>();
}