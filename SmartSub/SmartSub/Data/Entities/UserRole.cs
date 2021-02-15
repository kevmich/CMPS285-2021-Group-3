using Microsoft.AspNetCore.Identity;

namespace SmartSub.Data.Entities
{
    public class UserRole : IdentityUserRole<int>
    {
        public virtual User User { get; set; }

        public virtual Role Role { get; set; }
        public object Id { get; internal set; }
        public object Username { get; internal set; }
        public object UserRoles { get; internal set; }
    }
}
