using MovieTrackerAPI.Models.Entities;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MovieTrackerAPI.Models.DTOs
{
    public class ReviewDto
    {
        [Key]
        public int Id { get; set; }
        public string Content { get; set; }
        public float Rate { get; set; }

        public Guid MovieId { get; set; }

        [JsonIgnore]
        public Movie? Movie { get; set; }

        public string UserId { get; set; }

        public string? UserName { get; set; }

        public string? MovieTitle { get; set; }

        public string? Role { get; set; }

        [JsonIgnore]

        public User? User { get; set; }
    }
}
