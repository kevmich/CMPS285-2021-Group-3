﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartSub.Data.Entities
{
    public class Subscription
    {
        public int Id { get; set; }
        public string Provider { get; set; } // amazon, hulu, etc

        public DateTimeOffset RenewDate { get; set; } // renew date

        public string Note { get; set; } // notes description

        public double Price { get; set; }


        public int userId { get; set; }
        public User User { get; set; }  //reference to owner

        public string paymentFrequency { get; set; } //Weekly, Monthly, Annually


    }
}
