using System;
namespace SmartSub.Data.Entities
{
    public class TierTableDto
    {
        public int Id { get; set; } // user info
        public string ServiceName { get; set; } // name of the service subbed to
        public string Info { get; set; }
        public string TierName { get; set; } // name of the tier that user has
        public int Price { get; set; } // price of the tier
        public string[] Function { get; set; } // shows what comes with this tier of the sub.
    }
}
