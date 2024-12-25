using _3alegny.Entities;
using _3alegny.RepoLayer;
using MongoDB.Bson;
using MongoDB.Driver;

namespace _3alegny.Service_layer
{
    public class HospitalLogic
    {
        private readonly MongoDbContext _context;

        public HospitalLogic(MongoDbContext context)
        {
            _context = context;
        }

        public async Task<HospitalResult<EHR>> GetEHRbyID(string id)
        {
            try
            {
                var objectId = new ObjectId(id); 
                EHR CurrentEHR = await _context.EHRs.Find(u => u.EHR_id == objectId).FirstOrDefaultAsync();
                if (CurrentEHR == null)
                {
                    return new HospitalResult<EHR> { IsSuccess = false, Message = "EHR not found." };
                }
                return new HospitalResult<EHR> { IsSuccess = true, Data = CurrentEHR };
            }
            catch (Exception ex)
            {
                return new HospitalResult<EHR> { IsSuccess = false, Message = $"Error: {ex.Message}" };
            }
        }

    }
    public class HospitalResult<T>
    {
        public bool IsSuccess { get; set; }
        public T? Data { get; set; }
        public string? Message { get; set; }
    }

}
