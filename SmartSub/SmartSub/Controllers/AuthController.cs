using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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


        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }


        
        [HttpPost("Create")]
        public async Task<ActionResult> Create(CreateUserDto dto)
        {

            if (dto.Email.Length > 0) {
                if (!new EmailAddressAttribute().IsValid(dto.Email))
                {
                    return BadRequest("Email not valid");
                }
            }
            
            if (dto.Email.Length == 0)
            {
                dto.Email = null;
            }


                var user = new User { UserName = dto.Username, Email = dto.Email };
                var result = await userManager.CreateAsync(user, dto.Password);

                if (!result.Succeeded)
                {
                    return BadRequest();
                }

                await userManager.AddToRoleAsync(user, "User");

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
                UserName = user.UserName,
                Roles = roles
            });
        }



        [HttpPost("Logout")]
        public async Task<ActionResult> Logout()
        {
           await signInManager.SignOutAsync();

           return Ok();
        }
    }
}
