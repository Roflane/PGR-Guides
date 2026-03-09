using System.Reflection;
using Microsoft.OpenApi;
using PGRGuidesServer.Config;
using PGRGuidesServer.Db;
using PGRGuidesServer.Interfaces;
using PGRGuidesServer.Models;
using PGRGuidesServer.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace PGRGuidesServer.Extensions;

public static class ServiceExtensions {
    public static IServiceCollection UseSwagger(this IServiceCollection services) {
        services.AddSwaggerGen(c => {
            c.SwaggerDoc("v1", new OpenApiInfo { 
                Title = "PGR Guides API", 
                Version = "v1",
                Description = "PGR Guides API"
            });
            
            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            c.IncludeXmlComments(xmlPath);
            
            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme {
                In = ParameterLocation.Header,
                Description = "Please enter token",
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                BearerFormat = "JWT",
                Scheme = "bearer"
            });
            
            // c.AddSecurityRequirement(new OpenApiSecurityRequirement
            // {
            //     {
            //         new OpenApiSecurityScheme
            //         {
            //             Reference = new OpenApiReference
            //             {
            //                 Type = ReferenceType.SecurityScheme,
            //                 Id = "Bearer"
            //             }
            //         },
            //         new string[] {}
            //     }
            // });
        });
        
        return services;
    }

    public static IServiceCollection UseCors(this IServiceCollection services) {
        services.AddCors(options => {
            options.AddPolicy("AllowReactDev", policy => 
                policy.WithOrigins("http://localhost:5173")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials());
        });
        
        return services;
    }

    public static IServiceCollection UseDbContext(this IServiceCollection services, IConfiguration configuration) {
        services.AddDbContext<PgrGuidesDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));
            
        return services;
    }

    public static IServiceCollection UseIdentity(this IServiceCollection services, IConfiguration configuration) {
        services.AddIdentity<ApplicationUser, IdentityRole>(options => {
            options.Password.RequireDigit = true;
            options.Password.RequiredLength = 6;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = true;
            options.Password.RequireLowercase = true;

            options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
            options.Lockout.MaxFailedAccessAttempts = 5;
            options.Lockout.AllowedForNewUsers = true;

            options.User.RequireUniqueEmail = true;
        })
        .AddEntityFrameworkStores<PgrGuidesDbContext>()
        .AddDefaultTokenProviders();
        
        return services;
    }

    public static IServiceCollection UseAuth(this IServiceCollection services, IConfiguration configuration) {
        var jwtConfig = new JwtConfig();
        configuration.GetSection(JwtConfig.SectionName).Bind(jwtConfig);
        
        if (string.IsNullOrEmpty(jwtConfig.SecretKey)) {
            throw new InvalidOperationException("JWT SecretKey is not configured in appsettings.json");
        }
        services.AddSingleton(jwtConfig);
        services.AddAuthentication(options => {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options => {
            options.RequireHttpsMetadata = false;
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtConfig.Issuer,
                ValidAudience = jwtConfig.Audience,
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(jwtConfig.SecretKey)),
                ClockSkew = TimeSpan.Zero
            };
            
            options.Events = new JwtBearerEvents {
                OnMessageReceived = context =>
                {
                    var accessToken = context.Request.Query["access_token"];
                    var path = context.HttpContext.Request.Path;
                    
                    if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hubs"))
                    {
                        context.Token = accessToken;
                    }
                    
                    return Task.CompletedTask;
                }
            };
        });
        
        return services;
    }

    public static IServiceCollection UseServices(this IServiceCollection services) {
        services.AddControllers();
        services.AddControllersWithViews();

        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IProfileService, ProfileService>();
        services.AddScoped<ICharacterService, CharacterService>();
        return services;
    }
}