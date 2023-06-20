namespace MovieTrackerAPI.Models.Entities
{
    public class Movie
    {
        public Guid Id { get; set; }
        public string Title { get; set; }

        public ICollection<Category> Categories { get; set; }
    }
}
