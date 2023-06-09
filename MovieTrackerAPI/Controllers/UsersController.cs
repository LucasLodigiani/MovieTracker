﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieTrackerAPI.Models;
using MovieTrackerAPI.Models.DTOs;
using MovieTrackerAPI.Services.Interfaces;

namespace MovieTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILogger<UsersController> _logger;
        //private readonly HttpContextAccessor _contextAccessor;

        public UsersController(IUserService authService, ILogger<UsersController> logger)
        {
            _userService = authService;
            _logger = logger;
            //_contextAccessor = contextAccessor;

        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest("Invalid payload");
                var (status, message) = await _userService.Login(model);
                if (status == 0)
                    return BadRequest(message);
                return Ok(message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest("Invalid payload");
                var (status, message) = await _userService.Register(model, UserRoles.User);
                if (status == 0)
                {
                    return BadRequest(message);
                }
                return CreatedAtAction(nameof(Register), model);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsers();

            if(users == null)
            {
                return NoContent();
            }
            else
            {
                return Ok(users);
            }
            
        }

        [HttpDelete]
        [Route("DeleteUser")]
        public async Task<IActionResult> DeleteUser(string id)
        {

            var (status, message) = await _userService.DeleteUser(id);
            if(status == 0)
            {
                return BadRequest(message);
            }
            return NoContent();
        }

        [HttpPut]
        public async Task<IActionResult> ModifyUser(UserDto user)
        {
            var (status, userModified) = await _userService.ModifyUser(user);
            if (status == 0)
            {
                return BadRequest("Ha ocurrido un error al modificar al usuario");
            }
            return Ok(userModified);
        }

    }
}
