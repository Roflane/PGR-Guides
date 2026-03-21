using PGRGuidesServer.Enums;

namespace PGRGuidesServer.DTO;

public class GuideChangeStatusDto {
    public int Id { get; set; }
    public string GuideStatus { get; set; } = nameof(EGuideStatus.NONE);
}