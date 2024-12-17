using _3alegny.Service_layer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

public static class CommonEndpoints
{
    public static void MapCommonEndpoints(this WebApplication app)
    {
        // Use dependency injection to inject the CommonLogic service
        app.MapGet("/top-hospitals", async (CommonLogic logic) =>
        {
            // Call the method to get the top-rated hospitals
            var hospitals = await logic.GetTopRatedHospitals();
            return Results.Ok(hospitals);
        });


        // Endpoint to get the top-rated doctors
        app.MapGet("/top-doctors", async (CommonLogic logic) =>
        {
            var doctors = await logic.GetTopRatedDoctors();
            return Results.Ok(doctors);
        });
    }
}
