
using System.Threading.Tasks;
using SmartSub.Services.EmailRequest;

namespace SmartSub.Services
{
    public interface IEmailSender
    {

        Task SendEmailAsync(string email, string subject, string body);
       
    }
}
