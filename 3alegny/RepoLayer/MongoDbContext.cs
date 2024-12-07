using _3alegny.Entities;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
namespace _3alegny.RepoLayer;



public class MongoDbContext : DbContext
{
    private readonly IMongoDatabase _database;

    // this property used to access the "Users" collection, or create one if needed
    public IMongoCollection<User> Users => _database.GetCollection<User>("Users");

    public MongoDbContext(string connectionString, string databaseName)
    {
        var client = new MongoClient(connectionString);
        _database = client.GetDatabase(databaseName);
    }

    public IMongoCollection<T> GetCollection<T>(string collectionName)
    {
        return _database.GetCollection<T>(collectionName);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }

}
