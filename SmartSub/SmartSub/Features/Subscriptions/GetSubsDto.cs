﻿using System;
using System.Collections.Generic;

namespace SmartSub.Features.Subscriptions
{
    public class GetSubDto
    {
        public string Provider { get; set; }
        public double Price { get; set; }
        public string Note { get; set; }

    }
}