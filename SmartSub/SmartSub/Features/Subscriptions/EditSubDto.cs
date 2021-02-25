using System;
using SmartSub.Data.Entities;

namespace SmartSub.Features.User
{
    public class EditSubDto
    {
        public DateTimeOffset RenewDate { get; set; }
        public string Provider { get; set; }
        public double Price { get; set; }
        public string paymentFrequency { get; set; }
        public string Note { get; set; }
    }
}
