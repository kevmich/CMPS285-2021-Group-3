using Microsoft.AspNetCore.Mvc;
using SmartSub.Data;
using SmartSub.Data.Entities;
using SmartSub.Features.User;
using System.Linq;

namespace SmartSub.Controllers
{

    [Route("[controller]")]
    [ApiController]
    public class SubsController : ControllerBase
    {

        private readonly DataContext dataContext; // need to dependency inject the dataContext

        
        // Endpoint returns 500 when passed correct data
        [HttpPost("CreateSub")] // add authorized tag, shouldnt be able to create a sub without being logged in.
        public ActionResult<CreateSubDto> CreateSub(CreateSubDto dto)
        {
            
            var sub = dataContext.Set<Subscription>().Add(new Subscription
            {
                userId = dto.userId,
                Provider = dto.Provider,
                Price = dto.Price,
                Note = dto.Note,
                RenewDate = dto.RenewDate,
                paymentFrequency = dto.paymentFrequency
                
            }) ;
            dataContext.SaveChanges();


            return Created($"api/Subs/{sub.Entity.Id}", dto);
        }

        [HttpDelete("DeleteSub")]
        public ActionResult<GetSubDto> DeleteSub(int id)
        {
            var data = dataContext.Set<Subscription>().FirstOrDefault(x => x.Id == id);
            if (data == null)
            {
                return BadRequest();
            }
            dataContext.Set<Subscription>().Remove(data);
            dataContext.SaveChanges();
            return Ok();
        }
    }
        
    }
