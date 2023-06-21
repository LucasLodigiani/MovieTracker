using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieTrackerAPI.Data;
using MovieTrackerAPI.Models.DTOs;
using MovieTrackerAPI.Models.Entities;
using System.Linq;

namespace MovieTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public MoviesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieDto>>> GetMovies()
        {
            var movieDtos = await _context.Movies
                .Include(m => m.Categories)
                .Select(m => new MovieDto
                {
                    Id = m.Id,
                    Title = m.Title,
                    Categories = m.Categories
                })
                .ToListAsync();

            return Ok(movieDtos);
        }

        [HttpPost]
        public async Task<IActionResult> Create([MovieDto movieDto)
        {
            Movie movie = new Movie
            {
                Id = Guid.NewGuid(),
                Title = movieDto.Title,
                Categories = movieDto.Categories,
            };

            await _context.Movies.AddAsync(movie);
            await _context.SaveChangesAsync();
            return Ok(movie);

        }

        [HttpDelete("id")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                Movie movie = await _context.Movies.FirstOrDefaultAsync(i => i.Id == id);
                if (movie == null)
                {
                    return NotFound();
                }
                _context.Movies.Remove(movie);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
    }
}
