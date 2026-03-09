using System.Globalization;
using PGRGuidesServer.Extensions;

var builder = WebApplication.CreateBuilder(args);
builder.Services
    .UseCors()
    .UseSwagger()
    .UseDbContext(builder.Configuration)
    .UseIdentity(builder.Configuration)
    .UseAuth(builder.Configuration)
    .UseServices();

var app = builder.Build();
await app.UsePGRPipeline();
app.Run();