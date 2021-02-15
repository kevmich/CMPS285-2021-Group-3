using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SmartSub.Data;
using SmartSub.Data.Entities;
using SmartSub.Features;
using SmartSub.Features.User;

namespace SmartSub.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoginController : ControllerBase // rename the class to the name of the file.... LoginController != AuthController
    {

        private readonly DataContext dataContext; // unused variable
        private readonly UserManager<User> userManager;
        private readonly RoleManager<Role> roleManager;// unused variable
        private readonly SignInManager<User> signInManager;

        //remove unused variables from constructor
        public LoginController(DataContext dataContext, UserManager<User> userManager, RoleManager<Role> roleManager, SignInManager<User> signInManager)
        {
            this.dataContext = dataContext;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.signInManager = signInManager;
        }



        [HttpPost("login")]// capital L
        public async Task<ActionResult> LoginAsync(LoginDto dto)
        {
            var user = await userManager.FindByNameAsync(dto.userName);
            if (user == null)
            {
                return BadRequest();
            }

            var result = await signInManager.CheckPasswordSignInAsync(user, dto.passWord, true);
            if (!result.Succeeded)
            {
                return BadRequest();
            }

            await signInManager.SignInAsync(user, false, "Password");

            var roles = await userManager.GetRolesAsync(user);

            return Ok(new UserRoleDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Roles = roles
            });
        }



        [HttpPost("create")]// Capital C on create
        public async Task<ActionResult> Create(CreateUserDto dto)
        {
            var user = new User {UserName = dto.Username};
            var result = await userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
            {
                return BadRequest();
            }
            
            result = await userManager.AddToRoleAsync(user, "User");// get rid of assignment. The promise returned is not used.

            // User added successfully, you can safely use the Id now.
            var id = user.Id;// unused variable
            
            return Ok();
        }
    }
}
