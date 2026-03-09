using Microsoft.AspNetCore.Identity;

namespace PGRGuidesServer.Models;

public class ApplicationUser : IdentityUser {
    public string Login { 
        get => UserName; 
        set => UserName = value; 
    }
    public DateTimeOffset CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTimeOffset? UpdatedAt { get; set; } = null;
}