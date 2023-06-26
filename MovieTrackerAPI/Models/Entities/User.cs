using Microsoft.AspNetCore.Identity;

namespace MovieTrackerAPI.Models.Entities
{
    public class User : IdentityUser
    {

        public ICollection<Review> Reviews { get; set; }
    }
}
