using MovieTrackerAPI.Models;

namespace MovieTrackerAPI.Services.Interfaces
{
    public interface IUserService
    {
        Task<(int, string)> Register(RegisterModel model, string role);
        Task<(int, string)> Login(LoginModel model);
    }
}
