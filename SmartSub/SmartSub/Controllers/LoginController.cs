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

namespace SmartSub.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        private readonly DataContext dataContext;
        private readonly UserManager<User> userManager;
        private readonly RoleManager<Role> roleManager;
        private readonly SignInManager<User> signInManager;

        public LoginController(DataContext dataContext, UserManager<User> userManager, RoleManager<Role> roleManager, SignInManager<User> signInManager)
        {
            this.dataContext = dataContext;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.signInManager = signInManager;
        }



        [HttpPost("login")]
        public async Task<ActionResult> LoginAsync(loginDto dto)
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

            return Ok(new UserRole
            {
                Id = user.Id,
                Username = user.UserName,
                UserRoles = roles
            }); ;
        }



        [HttpPost("create")]
        public async Task<ActionResult> Create(loginDto dto)
        {
            var user = new User { UserName = dto.userName };
            await userManager.CreateAsync(user, dto.passWord);
            return Ok();
        }


    }
}
