using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartSub.Data.Entities
{
    public class Role : IdentityRole<int> // amount of access to website 
    {
        public virtual ICollection<UserRole> Users { get; set; } = new List<UserRole>();
    }
}
