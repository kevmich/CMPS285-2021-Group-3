namespace SmartSub.Data.Entities
{
    public class tier_table {
        
        public int userId { get; set; } // user info
        
        public int price { get; set; } // price of the tier 
        public string serviceName { get; set; } // name of the service subbed to
        public string tierName { get; set; } // name of the tier that user has
        public string[] function { get; set; } // shows what comes with this tier of the sub.
        
        
    }
}