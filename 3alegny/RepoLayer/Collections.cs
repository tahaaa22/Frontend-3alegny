using Microsoft.EntityFrameworkCore;
namespace _3alegny.RepoLayer;



public class Collections : DbContext
{
    public Collections()
    {

    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }

}
