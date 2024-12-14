using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace _3alegny.Entities
{
    public class PHR
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        public string Allergies { get; set; }
        public string ChronicIllness { get; set; }
        public string Diagnosis { get; set; }
        public string Medication { get; set; }
        public string FamilyHistory { get; set; }
        public string ImagingResults { get; set; }
        public string LabResults { get; set; }
        public string MedicalProcedures { get; set; }
        public string PrescriptionHistory { get; set; }
    }
}
