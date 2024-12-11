using _3alegny.RepoLayer;
using _3alegny.Service_layer;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;


var builder = WebApplication.CreateBuilder(args);

// Load .env file
Env.Load();

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

//// JWT Authentication and Authorization --> Still Needs to be implemented
//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//    .AddJwtBearer(jwtConfig =>
//    {
//        jwtConfig.Authority = "https://localhost:7169/swagger/index.html";
//        jwtConfig.TokenValidationParameters = new()
//        {
//            ValidAudience = "MyAudience",
//            ValidIssuer = "https://localhost:7169/swagger/index.html"
//        };
//    });
//builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
// Configure MongoDB
var mongoDbSettings = builder.Configuration.GetSection("MongoDbSettings").Get<MongoDbSettings>();
var dbContext = new MongoDbContext(mongoDbSettings.ConnectionString, mongoDbSettings.DatabaseName);

// Dependency Injection
builder.Services.AddSingleton(dbContext);
builder.Services.AddScoped<UserLogic>();


var app = builder.Build();

// Add the authentication and authorization middleware

//app.UseAuthentication();
//app.UseAuthorization();
app.MapUserEndpoints();
app.MapAdminEndpoints();

app.UseSwagger();
app.UseSwaggerUI();
app.Run();

record MongoDbSettings(string ConnectionString, string DatabaseName);