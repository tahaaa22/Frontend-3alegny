using _3alegny.RepoLayer;
using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using FastEndpoints.Swagger;

var bld = WebApplication.CreateBuilder();
bld.Services.AddFastEndpoints();
bld.Services.SwaggerDocument();

bld.Services.AddDbContextFactory<DbContext>(options =>
{
    //options.UseNpgsql();
});


var app = bld.Build();

app.UseSwaggerGen();
app.UseFastEndpoints();
app.Run();
