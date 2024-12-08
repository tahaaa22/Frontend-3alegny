
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace _3alegny.Entities
{
	public class PHR
	{
        public ObjectId PHRId { get; set; } 
		public string PatientId { get; set; }
        public string Notes { get; set; }
        public string AdminId { get; set; }
        public Admin Admin { get; set; }
        public Patient Patient { get; set; }
        public string? MedicalCondition { get; set; }
		public string? Medications { get; set; }
		public string? Allergies { get; set; }
		public List<HelperEntities.Drugs> Drugs { get; set; } = new List<HelperEntities.Drugs>();
		public string? Surgeries { get; set; }
		public string? FamilyHistory { get; set; }
		public string? SocialHistory { get; set; }
		public string? Immunizations { get; set; }
		public string? VitalSigns { get; set; }
		public string? LabResults { get; set; }
		public string? ImagingResults { get; set; }
	}
}
