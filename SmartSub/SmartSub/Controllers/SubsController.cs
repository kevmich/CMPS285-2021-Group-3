using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartSub.Data;
using SmartSub.Data.Entities;
using System.Linq;
using SmartSub.Features.Subscriptions;
using System.Collections.Generic;
using System.Linq.Expressions;
using System;
using Microsoft.AspNetCore.Identity;

namespace SmartSub.Controllers
{

    [Route("[controller]")]
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

       

        [Authorize]
        [HttpPost("CreateSub")]
        public ActionResult<CreateSubDto> CreateSub(CreateSubDto dto)
        {
            using (var transaction = dataContext.Database.BeginTransaction())
            {

                //Check for invalid PaymentFrequency---- i.e. Compare strings against the predetermined values- Weekly, Monthly, Annually, etc.
                if (dto.Price < 0)
                {
                    return BadRequest("Price must be non negative");
                }

                var sub = dataContext.Set<Subscription>().Add(new Subscription
                {
                    userId = dto.UserId,
                    Provider = dto.Provider,
                    Price = dto.Price,
                    Note = dto.Note,
                    RenewDate = dto.RenewDate,
                    paymentFrequency = dto.PaymentFrequency

                });

                dataContext.SaveChanges();

                transaction.Commit();
                return Created($"api/Subs/{sub.Entity.Id}", dto);
            }
        }

        [Authorize]
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

        [Authorize]
        [HttpPut("UpdateSub")]
        public ActionResult<EditSubDto> Edit(int id, EditSubDto dto)
        {

            using (var transaction = dataContext.Database.BeginTransaction())
            {
                
                // Verify PaymentFrequency

                if (dto.Price < 0)
                {
                    return BadRequest("Price must be non negative");
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
                dataContext.SaveChanges();

                transaction.Commit();
                return Ok();
            }
        }

        [HttpGet("GetAllSubs")]// Make the route more indicitve of what it is doing. For example - GetAllSubsByUserId
        public ActionResult<GetSubDto> GetAll(int id)
        {
            if (userManager.FindByIdAsync("" + id) == null)// use .toString() method. Not this wiere 
            {
                return BadRequest("User does not exist");
            }

            
            // return something like the following.
            // List<GetSubDto> subsToReturn = dataContext.set<Subscriptions>().where(x => x.userId == id);
            
            //return empty list if no items
            return Ok();
        }

        [HttpGet("GetSubById")]
        public ActionResult<GetSubDto> GetByUserId(int id)
        {
            //need to return something like the following
            // GetSubDto getSubDto = dataContext.set<Subscriptions>().FirstOrDefault(x => x.id == id);
            //then return dto inside of ok statement. return bad request if nothing is found 
            return Ok();
        }

    }
}


