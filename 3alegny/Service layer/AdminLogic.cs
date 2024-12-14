using _3alegny.Entities;
using _3alegny.RepoLayer;
using Microsoft.AspNetCore.Http.HttpResults;
using MongoDB.Driver;
using MongoDB.Bson;
using static AdminEndpoints;
using Microsoft.AspNetCore.Identity;

namespace _3alegny.Service_layer
{
    public class AdminLogic
    {
        private readonly MongoDbContext _context;

        public AdminLogic(MongoDbContext context)
        {
            _context = context;
        }

        // operation to create hospital
        public async Task<AdminResult<Hospital>> CreateHopital(HospitalRequest request)
        {
            // Check if username already exists
            var existingUser = await _context.Hospitals.Find(Builders<Hospital>.Filter.Eq(u => u.UserName, request.UserName)).FirstOrDefaultAsync();

            if (existingUser != null)
                return new AdminResult<Hospital> { IsSuccess = false, Data = existingUser, Message = "Error: duplicate hospitals" };


            var hospital = new Hospital
            {
                 Name = request.Name,
                  UserName= request.UserName,
                  Role = request.Role,
                  Password = HashPassword(request.Password),
                  contactInfo = request.contactInfo,
                  Address = request.Address,
                  CreatedAt = request.CreatedAt,
                  UpdatedAt = request.UpdatedAt,
                  DeletedAt = request.CreatedAt
            };

            await _context.Hospitals.InsertOneAsync(hospital);

            return new AdminResult<Hospital> { IsSuccess = true, Data = hospital, Message = $"Hospital {hospital.Name} created successful" };
        }

        private string HashPassword(string password)
        {
            var hasher = new PasswordHasher<string>();
            return hasher.HashPassword(null, password);
        }
    }
}

public class AdminResult<T>
{
    public bool IsSuccess { get; set; }
    public T? Data { get; set; }
    public string? Message { get; set; }
}
