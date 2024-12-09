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
            var existingUser = await _context.Users.Find(Builders<User>.Filter.Eq(u => u.UserName, request.UserName)).FirstOrDefaultAsync();

            if (existingUser != null)
                return (false, "Username already exists.");

            // Create the user
            var user = new Patient
            {
                Name = request.Name,
                Gender = request.Gender,
                contactInfo = new HelperEntities.ContactInfo
                {
                    Phone = request.ContactInfo // Assuming ContactInfo is just a phone number for now
                },
                Address = new HelperEntities.Address
                {
                    Street = request.Address // Assuming Address is a single line for now
                },

                UserName = request.UserName,
                Password = HashPassword(request.CreatePassword), // Use a hashing function
                CreatedAt = DateTime.UtcNow,
                Role = "patient" // Default role
            };

            await _context.Users.InsertOneAsync(user);

            return (true, "Signup successful.");
        }

        public async Task<(bool IsSuccess, string Message)> Login(UserLoginRequest request)

        {
            // Find user by username
            var user = await _context.Users.Find(u => u.UserName == request.UserName).FirstOrDefaultAsync();
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

        // Get all users
        public async Task<Result<List<User>>> GetAllUsers()
        {
            try
            {
                var users = await _context.Users.Find(_ => true).ToListAsync(); // Get all users
                if (users == null || !users.Any())
                {
                    return new Result<List<User>> { IsSuccess = false, Message = "No users found." };
                }
                return new Result<List<User>> { IsSuccess = true, Data = users };
            }
            catch (Exception ex)
            {
                return new Result<List<User>> { IsSuccess = false, Message = $"Error: {ex.Message}" };
            }
        }

        // Get a user by ID
        public async Task<Result<User>> GetUserById(string id)
        {
            try
            {
                var objectId = new ObjectId(id); // Convert string ID to MongoDB ObjectId
                var user = await _context.Users.Find(u => u.Id == objectId).FirstOrDefaultAsync();
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
                var deleteResult = await _context.Users.DeleteOneAsync(u => u.Id == objectId);
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



