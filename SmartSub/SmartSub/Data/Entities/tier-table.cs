using System.Collections.Generic;

namespace SmartSub.Data.Entities
{
    public class general_info {
        
        public int userId { get; set; } // user info
        public string serviceName { get; set; } // name of the service subbed to
        public List<tier> info { get; set; }
        
    }// end 

    public class tier {
        
        public string tierName { get; set; } // name of the tier that user has
        public int price { get; set; } // price of the tier
        public string[] function { get; set; } // shows what comes with this tier of the sub.
        
    }// end test 
}