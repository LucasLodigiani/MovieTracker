using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieTrackerAPI.Data;
using MovieTrackerAPI.Models.DTOs;
using MovieTrackerAPI.Models.Entities;
using System.IdentityModel.Tokens.Jwt;

namespace MovieTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ReviewsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllReviews()
        {
            var reviews = await _context.Reviews
            .Include(r => r.Movie)
            .Join(_context.Users, r => r.UserId, u => u.Id, (r, u) => new { Review = r, User = u })
            .Join(_context.UserRoles, ur => ur.User.Id, ur => ur.UserId, (ur, userRole) => new { Review = ur.Review, User = ur.User, UserRole = userRole })
            .Join(_context.Roles, ur => ur.UserRole.RoleId, role => role.Id, (ur, role) => new { Review = ur.Review, User = ur.User, Role = role })
            .Select(ur => new ReviewDto
            {
                Id = ur.Review.Id,
                Title = ur.Review.Title,
                Content = ur.Review.Content,
                Rate = ur.Review.Rate,
                MovieId = ur.Review.MovieId,
                MovieTitle = ur.Review.Movie.Title,
                UserId = ur.User.Id,
                UserName = ur.User.UserName,
                Role = ur.Role.Name
            })
            .ToListAsync();

            return Ok(reviews);
        }

        [HttpGet("id")]
        public async Task<IActionResult> GetReviewsByMovie(Guid movieId)
        {
            var reviews = await _context.Reviews
            .Where(r => r.MovieId == movieId)
            .Include(r => r.Movie)
            .Join(_context.Users, r => r.UserId, u => u.Id, (r, u) => new { Review = r, User = u })
            .Join(_context.UserRoles, ur => ur.User.Id, ur => ur.UserId, (ur, userRole) => new { Review = ur.Review, User = ur.User, UserRole = userRole })
            .Join(_context.Roles, ur => ur.UserRole.RoleId, role => role.Id, (ur, role) => new { Review = ur.Review, User = ur.User, Role = role })
            .Select(ur => new ReviewDto
            {
                Id = ur.Review.Id,
                Title = ur.Review.Title,
                Content = ur.Review.Content,
                Rate = ur.Review.Rate,
                MovieId = ur.Review.MovieId,
                MovieTitle = ur.Review.Movie.Title,
                UserId = ur.User.Id,
                UserName = ur.User.UserName,
                Role = ur.Role.Name
            })
            .ToListAsync();

            return Ok(reviews);
        }

        [HttpDelete("id")]
        
        public async Task<IActionResult> DeleteReview(int reviewId)
        {
            Review? review = await _context.Reviews.FirstOrDefaultAsync(r => r.Id == reviewId);
            if(review == null)
            {
                return NotFound();
            }

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();

            _context.Dispose();

            return NoContent();
        }


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateReview(ReviewDto reviewDto)
        {
            //TO DO: Verificar que el usuario exista xD

            var token = HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            // Decodificar el JWT
            var handler = new JwtSecurityTokenHandler();
            var decodedToken = handler.ReadJwtToken(token);

            // Acceder a los campos del JWT
            var userId = decodedToken.Claims.FirstOrDefault(c => c.Type == "unique_id")?.Value;
            //var userName = decodedToken.Claims.FirstOrDefault(c => c.Type == "unique_name")?.Value;
            // ...


            Movie? movieExist = await _context.Movies.FirstOrDefaultAsync(m => m.Id == reviewDto.MovieId);
            if (movieExist == null)
            {
                return NotFound("Esta pelicula no existe");
            }

            /*
            IEnumerable<Review>? userReviewsInTheSameMovie = await _context.Reviews.Where(m => m.MovieId == reviewDto.MovieId && m.UserId == userId).ToListAsync();
            if(userReviewsInTheSameMovie == null || userReviewsInTheSameMovie.Count() > 0)
            {
                return BadRequest("El usuario ya hizo una reseña a esta pelicula");
            }
            */
            Review review = new Review
            {
                Title = reviewDto.Title,
                Content = reviewDto.Content,
                Rate = reviewDto.Rate,
                UserId = userId,
                MovieId = reviewDto.MovieId,
            };

            await _context.Reviews.AddAsync(review);
            await _context.SaveChangesAsync();

            return Ok(review);
        }
    }
}
