using Microsoft.EntityFrameworkCore;

namespace WaterProject.API.Data
{
    public class WaterDbContext : DbContext
    {
        public WaterDbContext(DbContextOptions<WaterDbContext> options) : base(options) { }


// This line tells Entity Framework that there is a table called 'Projects' (yes, plural)
// in the database, and that the data will be mapped to 'Project' C# objects.
        public DbSet<Project> Projects { get; set; }
    }
}
