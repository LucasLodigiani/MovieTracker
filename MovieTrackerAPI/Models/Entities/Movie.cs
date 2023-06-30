namespace MovieTrackerAPI.Models.Entities
{
    public class Movie
    {
        public Guid Id { get; set; }
        public string Title { get; set; }

        public string Description { get; set; }

        public string Director { get; set; }

        public DateOnly ReleaseDate { get; set; }

        public string ImageUrl { get; set; }

        public ICollection<Category> Categories { get; set; }

        public ICollection<Review>? Reviews { get; set; }
    }
}
