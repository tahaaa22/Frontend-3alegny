using Newtonsoft.Json;
using System.Collections.Generic;

namespace _3alegny.RepoLayer
{
    public class EMR
    {
        public int EMR_id { get; set; }
        public int PatientId { get; set; }
        public string? Diagnosis { get; set; }
        public Doctor? Doctor { get; set; }
        public string? Prescription { get; set; }
        public string? Notes { get; set; }
        [JsonProperty("LabResults")]
        public List<string>? LabResults { get; set; }
        public string? ImagingResults { get; set; }
        public string? ProcedureHistory { get; set; }
        public string? MedicationHistory { get; set; }
        public string? Followup { get; set; } = null;

    }
    
}
