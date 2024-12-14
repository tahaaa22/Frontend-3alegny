using _3alegny.RepoLayer;
using _3alegny.Service_layer;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication;


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

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "3alegny phase 1",
        Version = "v1"
    });

    options.DocumentFilter<SwaggerTagDescriptionFilter>();
});

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

//connect resourse conc to handle frontend requests
builder.Services.AddCors();

// Configure MongoDB
var mongoDbSettings = builder.Configuration.GetSection("MongoDbSettings").Get<MongoDbSettings>();
var dbContext = new MongoDbContext(mongoDbSettings.ConnectionString, mongoDbSettings.DatabaseName);

// Dependency Injection
builder.Services.AddSingleton(dbContext);
builder.Services.AddScoped<UserLogic>();
builder.Services.AddScoped<AdminLogic>();
builder.Services.AddScoped<CommonLogic>();

var app = builder.Build();
app.UseCors(builder =>
    builder.WithOrigins("http://localhost:3000") // FIXME: add your local host lel frontend
           .AllowAnyMethod()
           .AllowAnyHeader());


// Add the authentication and authorization middleware

//app.UseAuthentication();
//app.UseAuthorization();


app.UseCors();

app.MapUserEndpoints();
app.MapAdminEndpoints();
app.MapCommonEndpoints();

app.UseSwagger();
app.UseSwaggerUI();
app.Run();

record MongoDbSettings(string ConnectionString, string DatabaseName);

// Add a custom filter to define tag descriptions
public class SwaggerTagDescriptionFilter : Swashbuckle.AspNetCore.SwaggerGen.IDocumentFilter
{
    public void Apply(Microsoft.OpenApi.Models.OpenApiDocument swaggerDoc, Swashbuckle.AspNetCore.SwaggerGen.DocumentFilterContext context)
    {
        swaggerDoc.Tags = new List<Microsoft.OpenApi.Models.OpenApiTag>
        {
            new() { Name = "admin", Description = "Operations related to the admin" },
            new() { Name = "user", Description = "Operations related to the auth" },
        };
    }
}