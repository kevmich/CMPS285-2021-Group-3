using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using SmartSub.Data;
using SmartSub.Services.EmailRequest;

namespace SmartSub.Services
{
    public interface IEmailSender
    {

        Task SendEmailAsync(string email, string subject, string body);

    }

    public class EmailSender : IEmailSender
    {


        private readonly SmtpSettings _emailConfig;

        public EmailSender(SmtpSettings emailConfig)
        {
            _emailConfig = emailConfig;
        }


        public async Task SendEmailAsync(string email, string subject, string body)
        {
            var fromAddress = new MailAddress(_emailConfig.SenderEmail, _emailConfig.SenderName);
            var toAddress = new MailAddress(email, "To Name");
            string fromPassword = _emailConfig.Password;


            var client = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = _emailConfig.Port,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(_emailConfig.SenderEmail, _emailConfig.Password)
            };

            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body
            })
            {
                
                client.Send(message);
            }

        }

    }


        
    }

