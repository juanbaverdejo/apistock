using Microsoft.EntityFrameworkCore;
using stockeate.Models;

namespace stockeate.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Producto> Producto { get; set; }
    }
}
