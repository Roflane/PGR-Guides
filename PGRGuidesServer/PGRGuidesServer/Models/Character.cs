using PGRGuidesServer.Enums;

namespace PGRGuidesServer.Models;

public sealed class Character {
    public String Name { get; set; }
    public String Image { get; set; }
    public EElement Element { get; set; }
    public EAffix Affix { get; set; }
}