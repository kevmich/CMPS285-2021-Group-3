using System;
using System.Collections.Generic;
using SmartSub.Data.Entities;

namespace SmartSub.Features.User
{
    public class UserRoleDto
    {
            public int Id { get; set; }
            public string UserName { get; set; }
            public ICollection<string> Roles { get; set; }
    }
}
