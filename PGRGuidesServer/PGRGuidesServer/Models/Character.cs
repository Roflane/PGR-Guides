using PGRGuidesServer.Enums;

namespace PGRGuidesServer.Models;

public sealed class Character {
    public string Name { get; set; }
    public string Image { get; set; }
    public EElement Element { get; set; }
    public EAffix Affix { get; set; }
}