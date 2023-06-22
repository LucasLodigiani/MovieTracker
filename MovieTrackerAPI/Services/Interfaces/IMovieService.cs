using MovieTrackerAPI.Models.DTOs;

namespace MovieTrackerAPI.Services.Interfaces
{
    public interface IMovieService
    {
        Task<(int, string)> CreateMovie(MovieDto movieDto);

        Task<Boolean> UpdateMovie(string Id);

        Task<Boolean> DeleteMovie(string Id);

        Task<Boolean> GetMovies(string Id);
    }
}
