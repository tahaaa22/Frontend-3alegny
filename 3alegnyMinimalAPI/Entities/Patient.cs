using System;
using Entities.Address;
using Entities.User;
using Entities.Order;

public class Patient : User
{
	public Patient()
	{
        public int Age { get; set; }
        public string Gender { get; set; }
        public Address PAddress { get; set; }
        public string Country { get; set; }
        public string Insurance { get; set; }
        public List<Order> Orders{ get; set; }
    }
}
