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

    public async Task<Guide> CreateAsync(bool createImmediately, GuideDto guideDto) {
        if (guideDto.Title == null || guideDto.Author == null || guideDto.Description == null || guideDto.StaticImagePath == null) {
            throw new ArgumentException("All fields are required");
        }

        var guideStatus = createImmediately ? nameof(EGuideStatus.RELEASED) : nameof(EGuideStatus.MODERATION);
        var guide = new Guide {
            Title = guideDto.Title,
            Author = guideDto.Author,
            Description = guideDto.Description,
            StaticImagePath = guideDto.StaticImagePath,
            GuideStatus = guideStatus
        };
        
        await ctx.Guides.AddAsync(guide);
        await ctx.SaveChangesAsync();
        return guide;
    }

    public async Task<bool> ChangeStatusAsync(GuideChangeStatusDto guideChangeStatusDto) {
        var guide = await ctx.Guides.FirstOrDefaultAsync(g => g.Id == guideChangeStatusDto.Id);
        if (guide is null || guideChangeStatusDto.Id <= 0) return false;
        
        guide.GuideStatus = guideChangeStatusDto.GuideStatus;
        await ctx.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id) {
        var guide = await ctx.Guides.FirstOrDefaultAsync(g => g.Id == id);
        if (guide is null || id <= 0) return false;
        
        ctx.Guides.Remove(guide);
        await ctx.SaveChangesAsync();
        return true;
    }
}