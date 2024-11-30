
namespace _3alegny.RepoLayer
{
    public class Hospital : Business
    {
        public float Rating { get; set; }
        public List<Doctor>? Doctors { get; set; }
        public List<string>? InsuranceAccepted { get; set; }
        public List<string>? Departments { get; set; }
    }
    
}
