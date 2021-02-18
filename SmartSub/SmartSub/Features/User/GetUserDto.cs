using System.Collections.Generic;

namespace SmartSub.Features.User
{
    public class GetUserDto 
    {
            public int Id { get; set; }
            public string UserName { get; set; }
            public ICollection<string> Roles { get; set; }
    }
}
