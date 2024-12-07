using _3alegny.RepoLayer;
using _3alegny.Entities;
using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using FastEndpoints.Swagger;
using Microsoft.Extensions.Options;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSwaggerGen();
builder.Services.AddEndpointsApiExplorer();
// Configure MongoDB
var mongoDbSettings = builder.Configuration.GetSection("MongoDbSettings").Get<MongoDbSettings>();
var dbContext = new MongoDbContext(mongoDbSettings.ConnectionString, mongoDbSettings.DatabaseName);

// Dependency Injection
builder.Services.AddSingleton(dbContext);

var app = builder.Build();

app.MapUserEndpoints();

app.UseSwagger();
app.UseSwaggerUI();
app.Run();

record MongoDbSettings(string ConnectionString, string DatabaseName);
