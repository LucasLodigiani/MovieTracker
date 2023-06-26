using System.ComponentModel.DataAnnotations;

namespace MovieTrackerAPI.Models.Entities
{
    public class Review
    {
        [Key]
        public int Id { get; set; }
        public string Content { get; set; }
        public float Rate { get; set; }

        public Guid MovieId { get; set; }

        public Movie? Movie { get; set; }

        public string UserId { get; set; }

        public User? User { get; set; }

    }
}
