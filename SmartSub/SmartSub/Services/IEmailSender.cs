using System;
using System.Threading.Tasks;

namespace SmartSub.Services
{
    public interface IEmailSender
    {
        Task sendEmailAsync(string email, string subject, string body);
       
    }
}
