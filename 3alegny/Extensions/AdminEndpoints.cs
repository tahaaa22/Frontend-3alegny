using _3alegny.Service_layer;
using _3alegny.Entities;


public static class AdminEndpoints
{
    public static void MapAdminEndpoints(this WebApplication app)
    {
        app.MapGet("/admin/users", (Func<UserLogic, IResult>)(logic =>
        {
            var result = logic.GetAllUsers().Result;
            return result.IsSuccess ? Results.Ok(result.Data) : Results.NotFound(result.Message);
        }));

        // Admin - Get a user by specific ID
        app.MapGet("/admin/user/{id}", (Func<string, UserLogic, IResult>)((id, logic) =>
        {
            var result = logic.GetUserById(id).Result;
            return result.IsSuccess ? Results.Ok(result.Data) : Results.NotFound(result.Message);
        }));

        // Admin - Delete a user
        app.MapDelete("/admin/user/{id}", (Func<string, UserLogic, IResult>)((id, logic) =>
        {
            var result = logic.DeleteUser(id).Result;
            return result.IsSuccess ? Results.Ok(result.Message) : Results.NotFound(result.Message);
        }));
    }
}

