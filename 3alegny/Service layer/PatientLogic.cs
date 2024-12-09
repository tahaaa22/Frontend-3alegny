using _3alegny.RepoLayer;

namespace _3alegny.Service_layer
{
    public class PatientLogic
    {
        private readonly MongoDbContext _context;

        public PatientLogic(MongoDbContext context)
        {
            _context = context;
        }
    }
}
