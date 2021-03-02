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

        public SubsController(UserManager<User> userManager)
        {
            this.userManager = userManager;
        }

        private readonly DataContext dataContext;

        public SubsController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }



        [Authorize]
        [HttpPost("CreateSub")]
        public ActionResult<CreateSubDto> CreateSub(CreateSubDto dto)
        {
            using (var transaction = dataContext.Database.BeginTransaction())
            {

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

        [HttpGet]
        public IEnumerable<GetSubDto> GetAll(int id)
        {
            userManager.FindByIdAsync(id)

            return (IEnumerable<GetSubDto>)dataContext.Set<Subscription>().Select().ToList();
        }
    }
}


