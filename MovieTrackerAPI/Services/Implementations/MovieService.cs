﻿using MovieTrackerAPI.Data;
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
                string mediaUrl = await SaveImage(movieDto.Image);

                Movie movie = new Movie
                {
                    Id = Guid.NewGuid(),
                    Title = movieDto.Title,
                    Categories = movieDto.Categories,
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

    }
}