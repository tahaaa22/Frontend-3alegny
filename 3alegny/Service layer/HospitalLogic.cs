using _3alegny.RepoLayer;

namespace _3alegny.Service_layer
{
    public class HospitalLogic
    {
        private readonly MongoDbContext _context;

        public HospitalLogic(MongoDbContext context)
        {
            _context = context;
        }
    }
}
