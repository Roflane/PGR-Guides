namespace PGRGuidesServer.DTO;

public class AuthResponseDto {
    public string Id { get; set; } = string.Empty;
    public string Login { get; set; } = string.Empty;
    public string AccessToken { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
    public DateTimeOffset ExpiresAt { get; set; }
    public DateTimeOffset RefreshTokenExpiresAt { get; set; }

    public string CreatedAt { get; set; }
    public string StaticImagePath { get; set; } = "/chibi/루시아.png";

    public IEnumerable<string> Roles { get; set; } = new List<string>();
}