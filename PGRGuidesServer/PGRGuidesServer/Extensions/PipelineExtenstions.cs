using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.FileProviders;

namespace PGRGuidesServer.Extensions;

public static class PipelineExtensions {
    public static async Task<WebApplication> UsePGRPipeline(this WebApplication app) {
        using (var scope = app.Services.CreateScope()) {
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var roles = new[] { "USER", "ADMIN", "MODERATOR" }; 
    
            foreach (var role in roles) {
                if (!await roleManager.RoleExistsAsync(role)) {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }
        }
        
        app.UseHttpsRedirection()
            .UseSwagger()
            .UseSwaggerUI()
            .UseCors("AllowReactDev")
            .UseRouting()
            .UseAuthentication() 
            .UseAuthorization()
            .Use(async (context, next) => {
                if (context.Request.Path == "/") {
                    context.Response.Redirect("/swagger");
                    return;
                }
                await next();
            });

        app.MapStaticAssets();
        app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}")
            .WithStaticAssets();
        
        app.UseStaticFiles(new StaticFileOptions {
            FileProvider = new PhysicalFileProvider(
                Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")),
            RequestPath = ""
        });
        return app;
    }
}