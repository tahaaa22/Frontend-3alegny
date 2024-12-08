using _3alegny.RepoLayer;
using _3alegny.Service_layer;
using _3alegny.Entities;
using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using FastEndpoints.Swagger;
using Microsoft.Extensions.Options;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

// Load .env file
DotNetEnv.Env.Load();

//Configure connection string from environment variable
var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__DBCon");
if (string.IsNullOrEmpty(connectionString))
{
    //throw new Exception("Connection string not found. Ensure the .env file is correctly configured and placed in the root directory.");

    //Add connection string to the applications configuration system
    builder.Configuration.AddInMemoryCollection(new Dictionary<string, string>
{ {"ConnectionStrings:DBCon", connectionString }
});
}

builder.Services.AddSwaggerGen();
builder.Services.AddEndpointsApiExplorer();
// Configure MongoDB
var mongoDbSettings = builder.Configuration.GetSection("MongoDbSettings").Get<MongoDbSettings>();
var dbContext = new MongoDbContext(mongoDbSettings.ConnectionString, mongoDbSettings.DatabaseName);

// Dependency Injection
builder.Services.AddSingleton(dbContext);
builder.Services.AddScoped<Logic>();


var app = builder.Build();

app.MapUserEndpoints();
app.MapAdminEndpoints();

app.UseSwagger();
app.UseSwaggerUI();
app.Run();

record MongoDbSettings(string ConnectionString, string DatabaseName);