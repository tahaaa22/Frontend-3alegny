using _3alegny.Entities;
using _3alegny.RepoLayer;
using Microsoft.AspNetCore.Identity;
using MongoDB.Driver;
using static UserEndpoints;
using MongoDB.Bson;
using UserLoginRequest = UserEndpoints.LoginRequest;



namespace _3alegny.Service_layer
{
    public class UserLogic
    {
        private readonly MongoDbContext _context;

        public UserLogic(MongoDbContext context)
        {
            _context = context;
        }

        public async Task<(bool IsSuccess, string Message)> Signup(SignupRequest request)
        {
            // Check if passwords match
            if (request.CreatePassword != request.ConfirmPassword)
                return (false, "Passwords do not match.");

            // Check if username already exists
            var existingUser = await _context.Patients.Find(Builders<Patient>.Filter.Eq(u => u.UserName, request.UserName)).FirstOrDefaultAsync();

            if (existingUser != null)
                return (false, "Username already exists.");

            // Create the user
            // TODO: fix patient obj and change it to user until verification
            var user = new Patient
            {
                Name = request.Name,
                Gender = request.Gender,
                contactInfo = new ContactInfo
                {
                    Phone = request.ContactInfo // Assuming ContactInfo is just a phone number for now
                },
                Address = new  Address
                {
                    Street = request.Address // Assuming Address is a single line for now
                },

                UserName = request.UserName,
                Password = HashPassword(request.CreatePassword), // Use a hashing function
                CreatedAt = DateTime.UtcNow,
                Role = "patient" // Default role
            };

            await _context.Patients.InsertOneAsync(user);

            return (true, "Signup successful.");
        }

        public async Task<(bool IsSuccess, string Message)> Login(UserLoginRequest request)

        {
            // Find user by username
            var user = await _context.Patients.Find(u => u.UserName == request.UserName).FirstOrDefaultAsync();
            if (user == null)
                return (false, "Invalid username or password.");

            // Verify password
            if (!VerifyPassword(request.Password, user.Password))
                return (false, "Invalid username or password.");

            return (true, "Login successful.");
        }

        private string HashPassword(string password)
        {
            var hasher = new PasswordHasher<string>();
            return hasher.HashPassword(null, password);
        }

        private bool VerifyPassword(string providedPassword, string storedPassword)
        {
            var hasher = new PasswordHasher<string>();
            var result = hasher.VerifyHashedPassword(null, storedPassword, providedPassword);
            return result == PasswordVerificationResult.Success;
        }

        // Get all Patients
        public async Task<Result<List<Patient>>> GetAllUsers()
        {
            try
            {
                var Patients = await _context.Patients.Find(_ => true).ToListAsync(); // Get all Patients
                if (Patients == null || !Patients.Any())
                {
                    return new Result<List<Patient>> { IsSuccess = false, Message = "No Patients found." };
                }
                return new Result<List<Patient>> { IsSuccess = true, Data = Patients };
            }
            catch (Exception ex)
            {
                return new Result<List<Patient>> { IsSuccess = false, Message = $"Error: {ex.Message}" };
            }
        }

        // Get a user by ID
        public async Task<Result<User>> GetUserById(string id)
        {
            try
            {
                var objectId = new ObjectId(id); // Convert string ID to MongoDB ObjectId
                var user = await _context.Patients.Find(u => u.Id == objectId).FirstOrDefaultAsync();
                if (user == null)
                {
                    return new Result<User> { IsSuccess = false, Message = "User not found." };
                }
                return new Result<User> { IsSuccess = true, Data = user };
            }
            catch (Exception ex)
            {
                return new Result<User> { IsSuccess = false, Message = $"Error: {ex.Message}" };
            }
        }

        // Delete a user by ID
        public async Task<Result<string>> DeleteUser(string id)
        {
            try
            {
                var objectId = new ObjectId(id); // Convert string ID to MongoDB ObjectId
                var deleteResult = await _context.Patients.DeleteOneAsync(u => u.Id == objectId);
                if (deleteResult.DeletedCount == 0)
                {
                    return new Result<string> { IsSuccess = false, Message = "User not found." };
                }
                return new Result<string> { IsSuccess = true, Message = "User deleted successfully." };
            }
            catch (Exception ex)
            {
                return new Result<string> { IsSuccess = false, Message = $"Error: {ex.Message}" };
            }
        }
    }
}

// Result wrapper for returning success/failure and data
public class Result<T>
{
    public bool IsSuccess { get; set; }
    public T? Data { get; set; }
    public string? Message { get; set; }
}



