using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using SmartSub.Data;
using SmartSub.Data.Entities;
using SmartSub.Features.User;

namespace SmartSub.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;


        public AuthController(DataContext dataContext, UserManager<User> userManager, RoleManager<Role> roleManager, SignInManager<User> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }



        [HttpPost("Create")]
        public async Task<ActionResult> Create(CreateUserDto dto)
        {
            var user = new User { UserName = dto.Username };
            var result = await userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
            {
                return BadRequest();
            }

            await userManager.AddToRoleAsync(user, "User");

            // User added successfully, you can safely use the Id now.

            return Ok();
        }


        [HttpPost("Login")]
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

            return Ok(new GetUserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Roles = roles
            });
        }



     [HttpPost("Logout")]
       public async Task<ActionResult> Logout()
        {
            return Ok();
        }
    }
}
