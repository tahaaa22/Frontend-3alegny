
namespace _3alegny.RepoLayer
{
    public class Doctor : User
    {
        public string? Specialty { get; set; }
        public string? License { get; set; }
        public string? Hospital { get; set; }
        public string? Description { get; set; }
        public Address? DAddress { get; set; }
        public string? Notes { get; set; }
        public string? Schedule { get; set; }
        public string? Reviews { get; set; }
        public float Rating { get; set; }
        public int AppointmentFee { get; set; }
    }
}
