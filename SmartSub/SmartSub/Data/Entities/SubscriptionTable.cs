using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartSub.Data.Entities
{
    
    public class SubscriptionTable
    {
       public int userId { get; set;  }
        public int Id { get; set; }
        public string Name { get; set; }
        public string tier { get; set;  }
        public string renewDate { get; set; }
        public string provider { get; set; }
        public string notes { get; set; }


    }
}
