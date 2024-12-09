using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace _3alegny.Entities
{
    [BsonDiscriminator(RootClass = true)]
    [BsonKnownTypes(typeof(Admin),typeof(Patient), typeof(Hospital), typeof(Pharmacy))]
    public class User
    {
        public ObjectId Id { get; set; }
        public string? Name { get; set; }
        public string? UserName { get; set; }
        public string? Role { get; set; } = "Patient"; // TODO: Change to an enum
        public string? Password { get; set; }
        public HelperEntities.ContactInfo? contactInfo { get; set; }
        public HelperEntities.Address? Address { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime DeletedAt { get; set; }
    }

    // Subclass: Admin
    public class Admin : User
    {
        public List<EMR> EMRs { get; set; } = new List<EMR>();
        public List<PHR> PHRs { get; set; } = new List<PHR>();
        public List<Hospital> Hospitals { get; set; } = new List<Hospital>();
        public List<Pharmacy> Pharmacies { get; set; } = new List<Pharmacy>();
    }

    // Subclass: Patient
    public class Patient : User
    {
        public List<Order> Orders { get; set; } = new List<Order>();
        public List<Appointments> Appointments { get; set; } = new List<Appointments>();
        public DateTime DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public List<HelperEntities.Insurance>? Insurance { get; set; }
        public float Height { get; set; }
        public float Weight { get; set; }

    }

    // Subclass: Hospital
    public class Hospital : User
    {
        public List<HelperEntities.Department> Departments { get; set; } = new List<HelperEntities.Department>();
        public List<EMR> EMRs { get; set; } = new List<EMR>();
        public List<Appointments> Appointments { get; set; } = new List<Appointments>();
        public double? Rating { get; set; } = 0.0;
        public List<HelperEntities.Doctors> Doctors { get; set; } = new List<HelperEntities.Doctors>();
        public List<HelperEntities.Insurance> InsuranceAccepted { get; set; } = new List<HelperEntities.Insurance>();
    }

    // Subclass: Pharmacy
    public class Pharmacy : User
    {
        public List<Order> Orders { get; set; } = new List<Order>();
        public List<HelperEntities.Drugs> Drugs { get; set; } = new List<HelperEntities.Drugs>();
    }
}
