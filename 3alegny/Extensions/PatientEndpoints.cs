﻿using Microsoft.AspNetCore.Identity.Data;
using _3alegny.Entities;
using _3alegny.RepoLayer;
using MongoDB.Bson;
using MongoDB.Driver;
using _3alegny.Service_layer;
public static class PatientEndpoints
{
    public static void MapPatientEndpoints(this WebApplication app)
    {
        app.MapPost("patients/newphr", (Func<requestPHR, PatientLogic, IResult >)((request, logic) =>
        {
            var result = logic.PostPHR(request).Result;
            return result.IsSuccess ? Results.Ok(result.Message) : Results.BadRequest(result.Message);
        })).WithTags("patient")
        .WithOpenApi(operation => new(operation)
        {
            Summary = "Post a new PHR",
            Description = "This endpoint allows patients to post a new PHR.",
            OperationId = "PostPHR",
        }
        );

        app.MapPost("patients/updatephr/{id}", (Func<string, requestPHR, PatientLogic, IResult>)((id,request, logic) =>
        {
            var result = logic.UpdatePHR(id,request).Result;
            return result.IsSuccess ? Results.Ok(result.Message) : Results.BadRequest(result.Message);
        })).WithTags("patient")
        .WithOpenApi(operation => new(operation)
        {
            Summary = "Update PHR",
            Description = "This endpoint allows patients to update their PHR.",
            OperationId = "UpdatePHR",
        }
        );

        app.MapGet("patients/getphr/{id}", (Func<string,PatientLogic, IResult>)((id,logic) =>
        {
            var result = logic.GetPHR(id).Result;
            return Results.Ok(result);
        })).WithTags("patient")
        .WithOpenApi(operation => new(operation)
        {
            Summary = "Get PHR",
            Description = "This endpoint allows patients to get their PHR.",
            OperationId = "GetPHR",
        }
        );
    }
    public record requestPHR(
        string Allergies,
        string ChronicIllness,
        string Diagnosis,
        string Medication,
        string FamilyHistory,
        string ImagingResults,
        string LabResults,
        string MedicalProcedures,
        string PrescriptionHistory
    );

}
