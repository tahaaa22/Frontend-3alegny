using System;
using Entities.Business;
using Entities.Doctor;

public class Hospital : Business
{
	public Hospital()
	{
        public float Rating { get; set; }
        public List<Doctor> Doctors { get; set; }
        public List<string> InsuranceAccepted { get; set; }
        public List<string> Departments { get; set; }
    }
    
}
