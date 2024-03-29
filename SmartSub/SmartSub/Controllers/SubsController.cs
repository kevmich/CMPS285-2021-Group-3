﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartSub.Data;
using SmartSub.Data.Entities;
using System.Linq;
using SmartSub.Features.Subscriptions;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace SmartSub.Controllers
{

    [Route("api/subs")]
    [ApiController]
    public class SubsController : ControllerBase
    {

        private readonly UserManager<User> userManager;
        private readonly DataContext dataContext;

        public SubsController(UserManager<User> userManager, DataContext dataContext)
        {
            this.userManager = userManager;
            this.dataContext = dataContext;
        }

        private Task<User> GetCurrentUserAsync() => userManager.GetUserAsync(HttpContext.User);



        [Authorize]
        [HttpPost("CreateSub")]
        public async Task<ActionResult<CreateSubDto>> CreateSub(CreateSubDto dto)
        {
            using (var transaction = dataContext.Database.BeginTransaction())
            {

                User user = await GetCurrentUserAsync();


                if (dto.Price < 0)
                {
                    return BadRequest("Price must be non negative");
                }

                if (dto.PaymentFrequency.ToLower() != "weekly")
                {
                    if (dto.PaymentFrequency.ToLower() != "monthly")
                    {
                        if (dto.PaymentFrequency.ToLower() != "annually")
                        {
                            return BadRequest("Payment frequency must be either: Weekly, Monthly, or Annually.");
                        }
                    }
                }


                var sub = await dataContext.Set<Subscription>().AddAsync(new Subscription
                {
                    userId = user.Id,
                    Provider = dto.Provider,
                    Price = dto.Price,
                    Note = dto.Note,
                    RenewDate = dto.RenewDate,
                    paymentFrequency = dto.PaymentFrequency

                });

                
                transaction.Commit();
                dataContext.SaveChanges();
                return Ok(dto);
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSub(int id)
        {
            using (var transaction = dataContext.Database.BeginTransaction())
            {
                var data = await dataContext.Set<Subscription>().FirstOrDefaultAsync(x => x.Id == id);
                if (data == null)
                {
                    return BadRequest();
                }
                dataContext.Set<Subscription>().Remove(data);
                
                transaction.Commit();
                dataContext.SaveChanges();
                return Ok();
            }
        }

        [Authorize]
        [HttpPut("UpdateSub")]
        public ActionResult<EditSubDto> Edit(int id, EditSubDto dto)
        {

            using (var transaction = dataContext.Database.BeginTransaction())
            {
                

                if (dto.Price < 0)
                {
                    return BadRequest("Price must be non negative");
                }

                if (dto.PaymentFrequency.ToLower() != "weekly")
                {
                    if (dto.PaymentFrequency.ToLower() != "monthly")
                    {
                        if (dto.PaymentFrequency.ToLower() != "annually")
                        {
                            return BadRequest("Payment frequency must be either: Weekly, Monthly, or Annually.");
                        }
                    }
                }

                var data = dataContext.Set<Subscription>().FirstOrDefault(x => x.Id == id);
                if (data == null)
                {
                    return BadRequest();
                }
                data.RenewDate = dto.RenewDate;
                data.Provider = dto.Provider;
                data.Price = dto.Price;
                data.paymentFrequency = dto.PaymentFrequency;
                data.Note = dto.Note;

                transaction.Commit();
                dataContext.SaveChanges();
                return Ok();
            }
        }

        [Authorize]
        [HttpGet("GetAllSubsForCurrentUser")]
        public async Task<ActionResult<GetSubDto>> GetAll()
        {

            User user = await GetCurrentUserAsync();

            if (userManager.FindByIdAsync(user.Id.ToString()) == null)
            {
                return BadRequest("User does not exist");
            }

            var subscriptions = await dataContext.Set<Subscription>().Where(x => x.userId == user.Id).Select(x =>
                new GetSubDto{
                    Id = x.Id,
                    Provider = x.Provider,
                    Price = x.Price,
                    PaymentFrequency = x.paymentFrequency,
                    RenewDate = x.RenewDate,
                    Note = x.Note}
                ).ToListAsync();

            return Ok(subscriptions);
            
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Subscription>> GetById(int id)
        {
            if (userManager.FindByIdAsync(id.ToString()) == null)
            {
                return BadRequest("User does not exist");
            }

            var data = await dataContext.Set<Subscription>().FirstOrDefaultAsync(x => x.Id == id);
            if (data == null)
            {
                return BadRequest();
            }

            var sub = await dataContext.Set<Subscription>().Where(x => x.Id == id).Select(x =>
                new GetSubDto
                {
                    Id = x.Id,
                    RenewDate = x.RenewDate,
                    Price = x.Price,
                    Provider = x.Provider,
                    PaymentFrequency = x.paymentFrequency,
                    Note = x.Note
                }
                ).ToListAsync();
            return Ok(sub);
        }
    }

}



