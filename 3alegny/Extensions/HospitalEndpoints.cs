using _3alegny.Entities;
using _3alegny.Service_layer;
using static UserEndpoints;

    public static class HospitalEndpoints
    {
        //public static void MapHospitalEndpoints(this WebApplication app)
        //{
        //    app.MapGet("/hospital/patient/{id}/EHR", (Func<RequestEHRbyID, HospitalLogic, IResult>)((request, logic) =>
        //    {
        //        var result = logic.GetEHRbyID(request.id).Result;
        //        return result.IsSuccess ? Results.Ok(result.Data) : Results.NotFound(result.Message);
        //    })).WithTags("Hospital")
        //       .WithOpenApi(operation => new(operation)
        //          {
        //              Summary = "Get a the patient's EHR using ID",
        //              Description = "This endpoint allows Get a the patient's EHR using ID.",
        //              OperationId = "GetEHRID",
        //          });

        //}

         public record RequestEHRbyID(
               string status,
               string id,
               EHR data,
               string message);
 
    }

