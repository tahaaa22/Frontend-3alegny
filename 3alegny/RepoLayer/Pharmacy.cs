using Newtonsoft.Json;
using System.Collections.Generic;
namespace _3alegny.RepoLayer
{
    public class Pharmacy : Business
    {
        [JsonProperty("Drugs")]
        public List<string>? Drugs { get; set; }
    }
}
