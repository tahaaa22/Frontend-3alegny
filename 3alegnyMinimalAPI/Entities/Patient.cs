using System;
using Entities.Address;

public class Patient
{
	public Patient()
	{
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int age { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public Address PAddress { get; set; }
        public string Country { get; set; }
    }
}
