using Microsoft.EntityFrameworkCore;
using PGRGuidesServer.Db;
using PGRGuidesServer.DTO;
using PGRGuidesServer.Enums;
using PGRGuidesServer.Interfaces;
using PGRGuidesServer.Models;

namespace PGRGuidesServer.Services;

public class GuideService(PgrGuidesDbContext ctx) : IGuideService {
    public async Task<List<Guide>> GetAllAsync() { 
        return await ctx.Guides.ToListAsync();
    }

    public async Task<Guide> CreateAsync(GuideDto guideDto) {
        if (guideDto.Title == null || guideDto.Author == null || guideDto.Description == null || guideDto.StaticImagePath == null) {
            throw new ArgumentException("All fields are required");
        }
        
        var guide = new Guide {
            Title = guideDto.Title,
            Author = guideDto.Author,
            Description = guideDto.Description,
            StaticImagePath = guideDto.StaticImagePath,
            GuideStatus = nameof(EGuideStatus.NONE)
        };
        
        await ctx.Guides.AddAsync(guide);
        await ctx.SaveChangesAsync();
        return guide;
    }

    public async Task<bool> DeleteAsync(int id) {
        var guide = await ctx.Guides.FirstOrDefaultAsync(g => g.Id == id);
        if (guide is null || id <= 0) return false;
        
        ctx.Guides.Remove(guide);
        await ctx.SaveChangesAsync();
        return true;
    }
}