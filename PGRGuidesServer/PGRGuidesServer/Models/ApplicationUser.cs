using Microsoft.AspNetCore.Identity;

namespace PGRGuidesServer.Models;

public class ApplicationUser : IdentityUser {
    public string Login { 
        get => base.UserName; 
        set => base.UserName = value; 
    }

    public string Id { get => base.Id; }
    public string StaticImagePath { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTimeOffset? UpdatedAt { get; set; } = null;
}