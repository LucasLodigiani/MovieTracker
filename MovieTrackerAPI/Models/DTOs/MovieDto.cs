using MovieTrackerAPI.Models.Entities;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MovieTrackerAPI.Models.DTOs
{
    public class MovieDto
    {
        public Guid? Id { get; set; }


        public string Title { get; set; }


        public IFormFile Image { get; set; }


        public string? ImageUrl { get; set; }


        public ICollection<Category> Categories { get; set; }
    }
}
