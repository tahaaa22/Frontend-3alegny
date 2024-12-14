using _3alegny.Entities;
using _3alegny.RepoLayer;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
namespace _3alegny.Service_layer
{
    public class CommonLogic
    {
        private readonly MongoDbContext _context;

        public CommonLogic(MongoDbContext context)
        {
            _context = context;
        }

        // Method to get the top 4 hospitals by rating
        public async Task<List<TopHospital>> GetTopRatedHospitals()
        {
            

            // Query to find the top 4 hospitals sorted by rating in descending order
            var topHospitals = await _context.Hospitals.Find(_ => true).Sort(Builders<Hospital>.Sort.Descending(h => h.Rating)) // Sort by Rating
                .Limit(4)// Get only the top 4
                .Project(h => new TopHospital(
                    h.Name,
                    h.Rating ?? 0.0)) 
                .ToListAsync();

            return topHospitals;
        }
    }

    public record TopHospital(string Name, double Rating);
}
