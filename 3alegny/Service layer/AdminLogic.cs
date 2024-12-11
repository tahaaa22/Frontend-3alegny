using _3alegny.RepoLayer;

namespace _3alegny.Service_layer
{
    public class AdminLogic
    {
        private readonly MongoDbContext _context;

        public AdminLogic(MongoDbContext context)
        {
            _context = context;
        }
    }
}
