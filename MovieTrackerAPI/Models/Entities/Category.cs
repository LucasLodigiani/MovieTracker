using System.Text.Json.Serialization;

namespace MovieTrackerAPI.Models.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public ICollection<Movie>? Movies { get; set; }
    }
}
