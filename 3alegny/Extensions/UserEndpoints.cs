using _3alegny.Entities;
using _3alegny.RepoLayer;
using MongoDB.Bson;
using MongoDB.Driver;

public static class UserEndpoints
{
    public static void MapUserEndpoints(this WebApplication app)
    {
        // Endpoint to retrieve all users
        app.MapGet("/users", (MongoDbContext dbContext) =>
        {
            var users = dbContext.GetCollection<User>("Users").Find(_ => true).ToList();
            return Results.Ok(users);
        });

        // Endpoint to create a new user
        app.MapPost("/users", (User user, MongoDbContext dbContext) =>
        {
            if (user.Id == ObjectId.Empty)  // If the Id is not set, MongoDB will generate it
            {
                user.Id = ObjectId.GenerateNewId();
            }

            dbContext.Users.InsertOne(user);
            return Results.Ok(user);
        });
    }
}

