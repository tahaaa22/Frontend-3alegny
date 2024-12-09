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

        app.MapPost("/signup", (Func<SignupRequest, UserLogic, IResult>)((request, logic) =>
        {
            var result = logic.Signup(request).Result;
            return result.IsSuccess ? Results.Ok(result.Message) : Results.BadRequest(result.Message);
        }));

        app.MapPost("/login", (Func<LoginRequest, UserLogic, IResult>)((request, logic) =>
        {
            var result = logic.Login(request).Result;
            return result.IsSuccess ? Results.Ok(result.Message) : Results.BadRequest(result.Message);
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




