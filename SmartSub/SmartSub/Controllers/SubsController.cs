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

            });
            dataContext.SaveChanges();


            return Created($"api/Subs/{sub.Entity.Id}", dto);
        }

        [HttpDelete("DeleteSub")]
        public ActionResult DeleteSub(int id)
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

        [HttpPut("UpdateSub")]
        public ActionResult<EditSubDto> Edit(int id, EditSubDto dto)
        {
            var data = dataContext.Set<Subscription>().FirstOrDefault(x => x.Id == id);
            if (data == null)
            {
                return BadRequest();
            }
            
            data.RenewDate = dto.RenewDate;
            data.Provider = dto.Provider;
            data.Price = dto.Price;
            data.paymentFrequency = dto.paymentFrequency;
            data.Note = dto.Note;
            dataContext.SaveChanges();

            return Ok();
        }
    }
}


