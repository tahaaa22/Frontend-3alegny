﻿using _3alegny.Entities;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
namespace _3alegny.RepoLayer;



public class MongoDbContext : DbContext
{
    private readonly IMongoDatabase _database;

    // this property used to access the "Users" collection, or create one if needed
    public IMongoCollection<User> Testing => _database.GetCollection<User>("Testing"); // FIXME: for testing and need to be changed
    public IMongoCollection<User> Users => _database.GetCollection<User>("Users");
    public IMongoCollection<Hospital> Hospitals => _database.GetCollection<Hospital>("Hospitals");
    public IMongoCollection<Pharmacy> Pharmacies => _database.GetCollection<Pharmacy>("Pharmacies");
    public IMongoCollection<Patient> Patients => _database.GetCollection<Patient>("Patients");
    public IMongoCollection<EHR> EHRs => _database.GetCollection<EHR>("EHRs"); // 
    public IMongoCollection<PHR> PHRs => _database.GetCollection<PHR>("PHRs");
    public IMongoCollection<Order> Orders => _database.GetCollection<Order>("Orders");
    public IMongoCollection<Appointments> Appointments => _database.GetCollection<Appointments>("Appointments");


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
