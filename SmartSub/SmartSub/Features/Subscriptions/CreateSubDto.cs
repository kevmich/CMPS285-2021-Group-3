using System;
using SmartSub.Data.Entities;

namespace SmartSub.Features.User
{
    public class CreateSubDto
    {
        public DateTimeOffset RenewDate { get; set; } // renew date
        
        // Trying to just get these three working before adding anymore.


        public string Provider { get; set; } // amazon, hulu, etc.

        public double Price { get; set; }
        
        public Frequency paymentFrequency { get; set; }

        public string Note { get; set; } // notes description
        public int userId { get; set; }
    }
}
