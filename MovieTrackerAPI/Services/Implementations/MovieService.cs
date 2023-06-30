using Microsoft.EntityFrameworkCore;
using MovieTrackerAPI.Data;
using MovieTrackerAPI.Models.DTOs;
using MovieTrackerAPI.Models.Entities;
using MovieTrackerAPI.Services.Interfaces;

namespace MovieTrackerAPI.Services.Implementations
{
    public class MovieService : IMovieService
    {
        private readonly IWebHostEnvironment _env;
        private readonly ApplicationDbContext _context;
        public MovieService(IWebHostEnvironment env, ApplicationDbContext context)
        {
            _env = env;
            _context = context;
        }

        public async Task<(int, string)> CreateMovie(MovieDto movieDto)
        {
            try
            {
                var categories = new List<Category>();

                // Itera sobre cada categoría del cuerpo de la solicitud POST y verifica si ya existe en la base de datos
                // Si existe, agréguela a la lista de categorías para esta película
                foreach (var category in movieDto.Categories)
                {
                    var existingCategory = await _context.Categories.FirstOrDefaultAsync(c => c.Name == category.Name);
                    if (existingCategory != null)
                    {
                        categories.Add(existingCategory);
                    }
                    else
                    {
                        categories.Add(new Category { Name = category.Name });
                    }
                }

                string mediaUrl = await SaveImage(movieDto.Image);

                Movie movie = new Movie
                {
                    Id = Guid.NewGuid(),
                    Title = movieDto.Title,
                    Director = movieDto.Director,
                    ReleaseDate = DateOnly.Parse(movieDto.ReleaseDate),
                    Description = movieDto.Description,
                    Categories = categories,
                    ImageUrl = mediaUrl,
                };

                await _context.Movies.AddAsync(movie);
                await _context.SaveChangesAsync();

                return (1, movie.Id.ToString());
            }
            catch(Exception ex)
            {
                return (0, ex.Message);
            }

        }

        public Task<bool> DeleteMovie(string Id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> GetMovies(string Id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateMovie(string Id)
        {
            throw new NotImplementedException();
        }

        public async Task<string> SaveImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return null;
            }

            var fileName = Path.GetFileName(file.FileName);
            var fileExtension = Path.GetExtension(fileName);
            //var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(fileName);

            // Genera un nombre de archivo único con un DateTime en el nombre para evitar conflictos y que sea unico
            var uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";

            // La ruta donde se guardará el archivo es wwwroot/Media
            var filePath = Path.Combine(_env.WebRootPath, "Media", uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return uniqueFileName;
        }

        public async Task<MovieDto?> GetMovieById(Guid Id)
        {
            MovieDto? movie = await _context.Movies.Include(c => c.Categories).Where(m => m.Id == Id).Select(m => new MovieDto
            {
                Id = m.Id,
                Title = m.Title,
                Description = m.Description,
                Director = m.Director,
                ReleaseDate = m.ReleaseDate.ToString(),
                ImageUrl = m.ImageUrl,
                Categories = m.Categories,
            }).FirstOrDefaultAsync();

            return movie;

        }
    }
}
