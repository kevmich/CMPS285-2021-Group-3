﻿using System;
using SmartSub.Data.Entities;

namespace SmartSub.Features.User
{
    public class CreateSubDto
    {
        public DateTimeOffset RenewDate { get; set; }
        public string Provider { get; set; }
        public double Price { get; set; }
        public string paymentFrequency { get; set; }
        public string Note { get; set; }
        public int userId { get; set; }
    }
}
