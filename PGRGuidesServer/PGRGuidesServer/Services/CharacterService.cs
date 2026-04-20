using System.Text.Json;
using PGRGuidesServer.Config;
using PGRGuidesServer.Interfaces;
using PGRGuidesServer.Models;

namespace PGRGuidesServer.Services;

public class CharacterService : ICharacterService {
    public async Task<List<Character>> GetAllAsync() {
        var json = await File.ReadAllTextAsync("wwwroot/characters_all.json");
        var options = new JsonSerializerOptions {
            PropertyNameCaseInsensitive = true
        };
        var characters = JsonSerializer.Deserialize<List<Character>>(json, options);
        
        if (characters != null) {
            foreach (var character in characters) {
                if (!string.IsNullOrEmpty(character.Image)) {
                    var fileName = Path.GetFileName(character.Image);
                    character.Image = ApiConfig.S3BaseUrl + "/characters/" + fileName;
                }
            }
        }
        
        return characters ?? new List<Character>();
    }
}