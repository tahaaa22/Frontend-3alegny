

namespace _3alegny.RepoLayer
{
    public class Patient : User
    {
        public int Age { get; set; }
        public string? Gender { get; set; }
        public Address? PAddress { get; set; }
        public string? Country { get; set; }
        public string? Insurance { get; set; }
        public List<Order>? Orders { get; set; }
    }
}
