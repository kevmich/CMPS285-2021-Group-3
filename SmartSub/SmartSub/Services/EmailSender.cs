using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;
using MimeKit;
using SmartSub.Data;
using SmartSub.Services.EmailRequest;

namespace SmartSub.Services
{
    public interface IEmailSender
    {
       void send(MimeMessage message);
    }

    public class EmailSender : IEmailSender
    {
        private readonly SmtpSettings _emailConfig;
        private readonly DataContext dataContext;

        public EmailSender(SmtpSettings emailConfig, DataContext dataContext)
        {
            _emailConfig = emailConfig;
            this.dataContext = dataContext;
        }

        public void SendEmail(Message message)
        {
            var emailMessage = CreateEmailMessage(message);
            send(emailMessage);
        }

        private MimeMessage CreateEmailMessage(Message message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(_emailConfig.SenderEmail));
            emailMessage.To.AddRange(message.To);
            emailMessage.Subject = message.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text) { Text = message.Content };

            return emailMessage;
        }

        public void send(MimeMessage message)
        {
            var client = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = _emailConfig.Port,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(message.From.ToString(), message.To.ToString())
            };

        }

        public class Message
        {

            public List<MailboxAddress> To { get; set; }
            public string Subject { get; set; }
            public string Content { get; set; }
            public Message(IEnumerable<string> to, string subject, string content)
            {
                To = new List<MailboxAddress>();
                To.AddRange(to.Select(x => new MailboxAddress(x)));
                Subject = subject;
                Content = content;
            }
        }
    }
}
