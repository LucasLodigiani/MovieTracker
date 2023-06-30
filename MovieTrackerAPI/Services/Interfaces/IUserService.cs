using MovieTrackerAPI.Models;
using MovieTrackerAPI.Models.DTOs;
using MovieTrackerAPI.Models.Entities;

namespace MovieTrackerAPI.Services.Interfaces
{
    public interface IUserService
    {
        Task<(int, string)> Register(RegisterModel model, string role);
        Task<(int, string)> Login(LoginModel model);

        Task<(int, UserDto)> ModifyUser(UserDto userDto);

        Task<(int, string)> DeleteUser(string id);

        Task<IEnumerable<UserDto>> GetAllUsers();
    }
}
