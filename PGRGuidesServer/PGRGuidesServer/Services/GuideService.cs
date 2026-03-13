using Microsoft.EntityFrameworkCore;
using PGRGuidesServer.Db;
using PGRGuidesServer.DTO;
using PGRGuidesServer.Interfaces;
using PGRGuidesServer.Models;

namespace PGRGuidesServer.Services;

public class GuideService(PgrGuidesDbContext ctx) : IGuideService {
    public async Task<List<GuideDto>> GetAllAsync() { 
        var guides = await ctx.Guides.ToListAsync();
        return guides.Select(g => new GuideDto {
            Title = g.Title,
            Author = g.Author,
            Description = g.Description,
            StaticImagePath = g.StaticImagePath
        }).ToList();
    }

    public async Task<GuideDto> CreateAsync(string title, string author, string description, string staticImagePath) {
        if (title == null || author == null || description == null || staticImagePath == null) {
            throw new ArgumentException("All fields are required");
        }
        
        var guide = new Guide {
            Title = title,
            Author = author,
            Description = description,
            StaticImagePath = staticImagePath
        };
        
        await ctx.Guides.AddAsync(guide);
        await ctx.SaveChangesAsync();
        return new GuideDto {
            Title = title,
            Author = author,
            Description = description,
            StaticImagePath = staticImagePath
        };;
    }
}