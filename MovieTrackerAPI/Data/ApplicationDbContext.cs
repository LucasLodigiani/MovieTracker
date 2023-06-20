using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MovieTrackerAPI.Models.Entities;
using System.Reflection.Emit;

namespace MovieTrackerAPI.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Category> Categories { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //Relacion de muchos a muchos entre movie y category
            modelBuilder.Entity<Movie>()
            .HasMany(m => m.Categories)
            .WithMany(c => c.Movies)
            .UsingEntity(j => j.ToTable("MovieCategory"));

        }

        
    }
}
