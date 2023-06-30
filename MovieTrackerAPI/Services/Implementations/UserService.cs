using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MovieTrackerAPI.Data;
using MovieTrackerAPI.Models;
using MovieTrackerAPI.Models.DTOs;
using MovieTrackerAPI.Models.Entities;
using MovieTrackerAPI.Services.Interfaces;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MovieTrackerAPI.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        public UserService(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, ApplicationDbContext context)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this._context = context;
            _configuration = configuration;

        }
        public async Task<(int, string)> Register(RegisterModel model, string role)
        {
            var userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return (0, "User already exists");

            User user = new()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username,
            };
            var createUserResult = await userManager.CreateAsync(user, model.Password);
            if (!createUserResult.Succeeded)
                return (0, "User creation failed! Please check user details and try again.");

            if (!await roleManager.RoleExistsAsync(role))
                await roleManager.CreateAsync(new IdentityRole(role));

            if (await roleManager.RoleExistsAsync(role))
                await userManager.AddToRoleAsync(user, role);

            return (1, "User created successfully!");
        }

        public async Task<(int, string)> Login(LoginModel model)
        {
            var user = await userManager.FindByNameAsync(model.Username);
            if (user == null)
                return (0, "Invalid username");
            if (!await userManager.CheckPasswordAsync(user, model.Password))
                return (0, "Invalid password");

            var userRoles = await userManager.GetRolesAsync(user);
            var authClaims = new List<Claim>
            {
               new Claim("unique_id", user.Id.ToString()),
               new Claim(ClaimTypes.Name, user.UserName),
               new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }
            string token = GenerateToken(authClaims);
            return (1, token);
        }


        private string GenerateToken(IEnumerable<Claim> claims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWTKey:Secret"]));
            var _TokenExpiryTimeInHour = Convert.ToInt64(_configuration["JWTKey:TokenExpiryTimeInHour"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _configuration["JWTKey:ValidIssuer"],
                Audience = _configuration["JWTKey:ValidAudience"],
                //Expires = DateTime.UtcNow.AddHours(_TokenExpiryTimeInHour),
                Expires = DateTime.UtcNow.AddHours(70),
                SigningCredentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256),
                Subject = new ClaimsIdentity(claims)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task<IEnumerable<UserDto>> GetAllUsers()
        {
            List<UserDto> users = await _context.Users
            .Join(_context.UserRoles, u => u.Id, ur => ur.UserId, (u, ur) => new { User = u, UserRole = ur })
            .Join(_context.Roles, ur => ur.UserRole.RoleId, r => r.Id, (ur, r) => new { User = ur.User, Role = r })
            .Select(ur => new UserDto
            {
                Id = ur.User.Id,
                UserName = ur.User.UserName,
                Email = ur.User.Email,
                Role = ur.Role.Name
            })
            .ToListAsync();

            return users;
        }

        public async Task<(int, string)> DeleteUser(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
            {
                return (0,"Not found");
            }
            await userManager.DeleteAsync(user);
            return (1, "User deleted");
        }

        public async Task<(int, UserDto)> ModifyUser(UserDto userDto)
        {
            var user = await userManager.FindByIdAsync(userDto.Id);
            if (user == null)
            {
                return (0, null);
            }
            if(userDto.UserName != "")
            {
                await userManager.SetUserNameAsync(user, userDto.UserName);

            }
            if(userDto.Email != "")
            {
                await userManager.SetEmailAsync(user, userDto.Email);
            }
            
            if(userDto.Role != "")
            {
                var changeRoles = await this.ChangeUserRoleAsync(user, userDto.Role);
            }


            UserDto userChanged = new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Role = userDto.Role,
            };
            return (1, userChanged);

        }

        public async Task<Boolean> ChangeUserRoleAsync(User user, string Role)
        {
            if(!await roleManager.RoleExistsAsync(Role))
            {
                await roleManager.CreateAsync(new IdentityRole(Role));
            }

            var roles = await userManager.GetRolesAsync(user);
            //remover roles
            var removeRolesResult = await userManager.RemoveFromRolesAsync(user, roles);

            var addRolesResult = await userManager.AddToRoleAsync(user, Role);

            return (true);
        }
    }
}
