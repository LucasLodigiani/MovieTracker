using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieTrackerAPI.Data;
using MovieTrackerAPI.Models.DTOs;
using MovieTrackerAPI.Models.Entities;
using MovieTrackerAPI.Services.Interfaces;
using System.Linq;

namespace MovieTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMovieService _movieService;
        public MoviesController(ApplicationDbContext context, IMovieService movieService )
        {
            _context = context;
            _movieService = movieService;
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
                    Categories = m.Categories,
                    ImageUrl = m.ImageUrl,
                    
                })
                .ToListAsync();

            return Ok(movieDtos);
        }

        [HttpPost("movies")]
        public async Task<ActionResult<List<MovieDto>>> GetMoviesByIds([FromBody] IEnumerable<Guid> ids)
        {
            var movieDtos = await _context.Movies
                .Where(m => ids.Contains(m.Id))
                .Include(m => m.Categories)
                .Select(m => new MovieDto
                {
                    Id = m.Id,
                    Title = m.Title,
                    Categories = m.Categories,
                    ImageUrl = m.ImageUrl
                })
                .ToListAsync();

            return Ok(movieDtos);
        }

        [HttpGet("id")]
        public async Task<IActionResult> GetMovie(Guid Id)
        {
            try
            {
                var movieDto = await _movieService.GetMovieById(Id);

                if (movieDto == null)
                {
                    return NotFound();
                }
                return Ok(movieDto);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
            
        } 


        [HttpPost]
        public async Task<IActionResult> Create([FromForm] MovieDto movieDto)
        {

            var (status, result) = await _movieService.CreateMovie(movieDto);
            if(status == 1)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result);
            }


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
