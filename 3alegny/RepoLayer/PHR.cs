
namespace _3alegny.RepoLayer
{
	public class PHR
	{
		public int PHRId { get; set; }
		public int PatientId { get; set; }
		public string? MedicalCondition { get; set; }
		public string? Medications { get; set; }
		public string? Allergies { get; set; }
		public List<Drugs>?	Drugs { get; set; }
		public string? Surgeries { get; set; }
		public string? FamilyHistory { get; set; }
		public string? SocialHistory { get; set; }
		public string? Immunizations { get; set; }
		public string? VitalSigns { get; set; }
		public string? LabResults { get; set; }
		public string? ImagingResults { get; set; }
	}
}
