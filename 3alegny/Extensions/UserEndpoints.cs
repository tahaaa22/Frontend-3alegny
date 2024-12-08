using _3alegny.Service_layer;
using Microsoft.AspNetCore.Identity.Data;
using _3alegny.Entities;
using _3alegny.RepoLayer;
using MongoDB.Bson;
using MongoDB.Driver;

public static class UserEndpoints
{
    public static void MapUserEndpoints(this WebApplication app)
    {
        //// Endpoint to retrieve all users
        //app.MapGet("/users", (Func<MongoDbContext, IResult>)(dbContext =>
        //{
        //    var users = dbContext.GetCollection<User>("Users").Find(_ => true).ToList();
        //    return Results.Ok(users);
        //}));

        //// Endpoint to create a new user
        //app.MapPost("/users", (Func<User, MongoDbContext, IResult>)((user, dbContext) =>
        //{
        //    if (user.Id == ObjectId.Empty)  // If the Id is not set, MongoDB will generate it
        //    {
        //        user.Id = ObjectId.GenerateNewId();
        //    }

        //    dbContext.Users.InsertOne(user);
        //    return Results.Ok(user);
        //}));

        app.MapPost("/signup", (Func<SignupRequest, Logic, IResult>)((request, logic) =>
        {
            var result = logic.Signup(request).Result;
            return result.IsSuccess ? Results.Ok(result.Message) : Results.BadRequest(result.Message);
        }));

        app.MapPost("/login", (Func<LoginRequest, Logic, IResult>)((request, logic) =>
        {
            var result = logic.Login(request).Result;
            return result.IsSuccess ? Results.Ok(result.Message) : Results.BadRequest(result.Message);
        }));
    }


    public static void MapAdminEndpoints(this WebApplication app)
    {
        app.MapGet("/admin/users", (Func<Logic, IResult>)(logic =>
        {
            var result = logic.GetAllUsers().Result;
            return result.IsSuccess ? Results.Ok(result.Data) : Results.NotFound(result.Message);
        }));

        // Admin - Get a user by specific ID
        app.MapGet("/admin/user/{id}", (Func<string, Logic, IResult>)((id, logic) =>
        {
            var result = logic.GetUserById(id).Result;
            return result.IsSuccess ? Results.Ok(result.Data) : Results.NotFound(result.Message);
        }));

        // Admin - Delete a user
        app.MapDelete("/admin/user/{id}", (Func<string, Logic, IResult>)((id, logic) =>
        {
            var result = logic.DeleteUser(id).Result;
            return result.IsSuccess ? Results.Ok(result.Message) : Results.NotFound(result.Message);
        }));
    }

    public record SignupRequest(
       string Name,
       int Age,
       string Gender,
       string ContactInfo,
       string Address,
       string UserName,
       string CreatePassword,
       string ConfirmPassword
   );

    public record LoginRequest(string UserName, string Password);
}




