using System;
using Entities.Doctor;

public class EMR
{
	public EMR()
	{
        public int EMR_id { get; set; }
        public int PatientId { get; set; }
        public string Diagnosis { get; set; }
        public Doctor Doctor { get; set; }
        public string Prescription { get; set; }
        public string Notes { get; set; }
        [JsonPropertyDrug("LabResults")]
        public string LabResults { get; set; }
        public string ImagingResults { get; set; }
        public string ProcedureHistory { get; set; }
        public string MedicationHistory { get; set; }

    }
	public string Followup { get; set; }
}
