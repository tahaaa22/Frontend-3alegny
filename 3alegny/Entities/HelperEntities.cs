﻿using MongoDB.Bson;

namespace _3alegny.Entities
{
        public class Department
        {
            public ObjectId Id { get; set; } 
            public string Name { get; set; }
            public List<Doctors> AvaliableDoctors{ get; set; } = new List<Doctors>();
        }

        public class Insurance
        {
            public ObjectId Id { get; set; }
            public string providerName { get; set; } 
            public string policyType { get; set; }
            public Coverage coverage { get; set; }
        }

        public class Coverage
        {
            public ObjectId Id { get; set; }
            public Boolean inPatient { get; set; }
            public Boolean outPatient { get; set; }
            public Boolean emergency { get; set; }
            public Boolean dental { get; set; }
        }
        public class Drugs
        {
            public ObjectId Id { get; set; } 
            public string Name { get; set; }
            public string Description { get; set; }
            public double Price { get; set; }
            public int Quantity { get; set; }
            public DateTime ExpiryDate { get; set; }
            public string? Manufacturer { get; set; }
            public string? Category { get; set; }
            public string? Type { get; set; }
        }

        // Helper Class: Address
        public class Address
        {
            public string Street { get; set; }
            public string City { get; set; }
            public string State { get; set; }
            public string ZipCode { get; set; }
        }

        // Helper Class: ContactInfo
        public class ContactInfo
        {
            public string Phone { get; set; }
            public string Email { get; set; }
        }

        // Helper Class: Doctors
        public class Doctors
        {
            public ObjectId Id { get; set; } 
            public string Name { get; set; }
            public string Specialty { get; set; }
            public string HospitalId { get; set; }
            public string? License { get; set; }
            public string? Hospital { get; set; }
            public string? Description { get; set; }
            public Address Address { get; set; }
            public string? Schedule { get; set; } // FIXME: not needed
            public string? Reviews { get; set; }
            public float Rating { get; set; }
            public int AppointmentFee { get; set; }
        }
}
