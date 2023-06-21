using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieTrackerAPI.Data;

namespace MovieTrackerAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            try
            {
                var categories = await _context.Categories.ToListAsync();
                if(categories == null)
                {
                    return NotFound();
                }
                return Ok(categories);
            }
            catch (Exception ex) 
            { 
                return BadRequest(ex);
            }
        }
    }
}
