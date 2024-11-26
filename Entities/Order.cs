using System;
using Entities.Pharmacy;

public class Order
{
	public Order()
	{   
        public int OrderId { get; set; }
        public int PatientId { get; set; }
        public int PharmacyId { get; set; }
        public List<Drug> MedicationList { get; set; }
        public string Status { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public int TotalCost { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal Total { get; set; }
    }
}
