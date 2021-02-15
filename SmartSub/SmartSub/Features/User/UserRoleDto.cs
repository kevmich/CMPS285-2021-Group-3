using System;
using System.Collections.Generic;
using SmartSub.Data.Entities;

namespace SmartSub.Features.User
{
    public class UserRoleDto // naming convention can be confused with the UserRole entity. try GetUserDto... its more indicitive of what this class is used for.
    {
            public int Id { get; set; }
            public string UserName { get; set; }
            public ICollection<string> Roles { get; set; }
    }
}
