using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MovieTrackerAPI.Models.Entities
{
    public class Review
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }
        public double Rate { get; set; }

        public Guid MovieId { get; set; }

        [JsonIgnore]
        public Movie? Movie { get; set; }

        public string UserId { get; set; }

        [JsonIgnore]
        public User? User { get; set; }

    }
}
