using Microsoft.AspNetCore.Mvc;
using PGRGuidesServer.Interfaces;
using PGRGuidesServer.Models;

namespace PGRGuidesServer.Controllers;

/// <summary>
/// Controller for PGR Characters
/// </summary>
/// <param name="characterService"></param>
[ApiController]
[Route("api/[controller]")]
public class CharactersController(ICharacterService characterService) : ControllerBase {
    /// <summary>
    /// Asynchronously gets all characters from JSON
    /// </summary>
    /// <returns>Action result of invoice</returns>
    [HttpGet]
    public async Task<ActionResult<List<Character>>> GetAll() {
        return Ok(await characterService.GetAllAsync());
    }
}