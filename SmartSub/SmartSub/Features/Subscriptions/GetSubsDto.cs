using System;
using System.Collections.Generic;

namespace SmartSub.Features.User
{
    public class GetSubDto
    {


        public string Provider { get; set; } // amazon, hulu, etc.

        public double Price { get; set; }

        public string Note { get; set; } // notes description

    }
}
