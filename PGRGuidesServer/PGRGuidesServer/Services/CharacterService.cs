using System.Text.Json;
using PGRGuidesServer.Interfaces;
using PGRGuidesServer.Models;

namespace PGRGuidesServer.Services;

public class CharacterService : ICharacterService {
    public async Task<List<Character>> GetAll() {
        var json = await File.ReadAllTextAsync("wwwroot/characters_all.json");
        var options = new JsonSerializerOptions {
            PropertyNameCaseInsensitive = true
        };
        var characters = JsonSerializer.Deserialize<List<Character>>(json, options);
        return characters ?? new List<Character>();
    }
}