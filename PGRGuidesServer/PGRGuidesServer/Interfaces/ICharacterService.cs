using PGRGuidesServer.Models;

namespace PGRGuidesServer.Interfaces;

public interface ICharacterService {
    Task<List<Character>> GetAll();
}