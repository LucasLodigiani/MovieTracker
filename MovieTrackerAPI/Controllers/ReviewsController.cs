using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieTrackerAPI.Data;
using MovieTrackerAPI.Models.DTOs;
using MovieTrackerAPI.Models.Entities;

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

        [HttpPost]
        public async Task<IActionResult> CreateReview(ReviewDto reviewDto)
        {

            Review review = new Review
            {
                Content = reviewDto.Content,
                Rate = reviewDto.Rate, 
                UserId = reviewDto.UserId,
                MovieId = reviewDto.MovieId,
            };
            await _context.Reviews.AddAsync(review);
            await _context.SaveChangesAsync();
            _context.Dispose();
            return Ok();
        }
    }
}
