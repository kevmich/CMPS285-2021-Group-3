using Microsoft.AspNetCore.Mvc;
using SmartSub.Data;
using SmartSub.Data.Entities;
using SmartSub.Features.User;

namespace SmartSub.Controllers
{

    [Route("[controller]")]
    [ApiController]
    public class SubsController : ControllerBase
    {

        private readonly DataContext dataContext;

        [HttpPost("CreateSub")]
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
    }
        
    }
