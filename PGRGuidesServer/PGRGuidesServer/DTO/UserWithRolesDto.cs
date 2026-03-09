namespace PGRGuidesServer.DTO;

public class UserWithRolesDto {
    public string Id { get; set; } = string.Empty;
    public string Login { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public IList<string> Roles { get; set; } = new List<string>();
}