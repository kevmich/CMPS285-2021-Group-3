using System;
using System.Collections.Generic;

namespace SmartSub.Features.Subscriptions
{
    public class GetSubDto
    {
        public int Id { get; set; }
        public string Provider { get; set; }
        public double Price { get; set; }
        public string Note { get; set; }
        public DateTimeOffset RenewDate { get; set; }
        public string PaymentFrequency { get; set; }
    }
}
