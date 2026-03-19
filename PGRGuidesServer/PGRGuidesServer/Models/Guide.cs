using PGRGuidesServer.Enums;

namespace PGRGuidesServer.Models;

public class Guide {
    public int Id { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public string Description { get; set; }
    public string StaticImagePath { get; set; }
    
    public string GuideStatus { get; set; } = nameof(EGuideStatus.NONE);

    // public DateTimeOffset CreatedAt { get; set; } = DateTime.UtcNow;
    // public DateTimeOffset? UpdatedAt { get; set; }
}