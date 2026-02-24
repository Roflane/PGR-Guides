using Microsoft.AspNetCore.Mvc;
using PGRGuidesServer.Interfaces;
using PGRGuidesServer.Models;

namespace PGRGuidesServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CharactersController(ICharacterService characterService) : ControllerBase {
    [HttpGet]
    public async Task<ActionResult<List<Character>>> GetAll() {
        return Ok(await characterService.GetAll());
    }
}