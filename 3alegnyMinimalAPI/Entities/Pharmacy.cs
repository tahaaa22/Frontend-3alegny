using System;
using Entities.Business;
using Entities.Drugs;

public class Pharmacy : Business
{
	public Pharmacy()
	{
        [JsonPropertyDrug("Drugs")]
        public string Drugs { get; set; }
    }
}
