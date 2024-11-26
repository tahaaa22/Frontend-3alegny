using System;
using Entities.Hospital;
using Entities.Doctor;

public class EMR
{
	public EMR() : Hospital
	{
		public int EMR_id { get; set; }
		public int PatientId { get; set; }
		public DateTime VisitHistory { get; set; }
		public string Diagnosis { get; set; }
		public Doctor Doctor { get; set; }
        public string Prescription { get; set; }
        public string Notes { get; set; }
        public string LabResults { get; set; }
        public string ImagingResults { get; set; }
        public string ProcedureHistory { get; set; }
		public string MedicationHistory { get; set; }

	}
	public string Followup { get; set; }
}
