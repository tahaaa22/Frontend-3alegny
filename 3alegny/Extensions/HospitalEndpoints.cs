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
                return Results.Ok(new { Success = true, Message = result, DoctorId = doctor.Id });
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


        // PUT endpoint to retrieve and update a doctor by ID
        app.MapPut("/upsert-doctor/{doctorId}", async (HospitalLogic logic, string doctorId, Doctors updatedDoctor) =>
        {
            try
            {
                var result = await logic.UpdateDoctorById(doctorId, updatedDoctor);
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
            Summary = "Get and update doctor by ID",
            Description = "Fetches a doctor's details based on their ID and allows updating those details.",
            OperationId = "UpsertDoctorById"
        });


        // DELETE endpoint to remove a doctor by ID
        app.MapDelete("/delete-doctor/{doctorId}", async (HospitalLogic logic, string doctorId) =>
        {
            try
            {
                var result = await logic.DeleteDoctorById(doctorId);
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
            Summary = "Delete a doctor by ID",
            Description = "Removes a doctor from the hospital's doctor list by their ID.",
            OperationId = "DeleteDoctorById"
        });

        // POST endpoint to create an EHR if the patient doesn't have one
        app.MapPost("/post-ehr", async (HospitalLogic logic, EHR ehr) =>
        {
            try
            {
                var result = await logic.CreateEHR(ehr);
                return Results.Ok(new { Success = true, Message = result, PatientId = ehr.PatientId });
            }
            catch (Exception e)
            {
                return Results.BadRequest(new { Success = false, Message = e.Message });
            }
        })
        .WithTags("EHR")
        .WithOpenApi(operation => new(operation)
        {
            Summary = "Create a new EHR for a patient",
            Description = "Adds a new EHR record for a patient if they don't already have one.",
            OperationId = "CreateEHR"
        });

    }
}
