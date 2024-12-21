﻿using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using _3alegny.Service_layer;
using _3alegny.Entities;

public static class HospitalEndpoints
{
    public static void MapHospitalEndpoints(this WebApplication app)
    {
        // POST endpoint to add a new department
        app.MapPost("/post-departments", async (HospitalLogic logic, string hospitalId, string departmentName) =>
        {
            try
            {
                var result = await logic.AddDepartment(hospitalId, departmentName);
                return Results.Ok(new { Success = true, Message = result });
            }
            catch (Exception e)
            {
                return Results.BadRequest(new { Success = false, Message = e.Message });
            }
        })
        .WithTags("Departments")
        .WithOpenApi(operation => new(operation)
        {
            Summary = "Add a new department",
            Description = "Adds a new department to a hospital based on its ID.",
            OperationId = "AddDepartment"
        });

        // POST endpoint to add a new doctor
        app.MapPost("/post-doctors", async (HospitalLogic logic, Doctors doctor) =>
        {
            try
            {
                var result = await logic.AddDoctor(doctor);
                return Results.Ok(new { Success = true, Message = result });
            }
            catch (Exception e)
            {
                return Results.BadRequest(new { Success = false, Message = e.Message });
            }
        })
        .WithTags("Doctors")
        .WithOpenApi(operation => new(operation)
        {
            Summary = "Add a new doctor",
            Description = "Adds a new doctor to a hospital.",
            OperationId = "AddDoctor"
        });
    }
}
