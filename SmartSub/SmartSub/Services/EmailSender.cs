using System;
using System.Net.Mail;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;
using MimeKit;
using SmartSub.Services.EmailRequest;

namespace SmartSub.Services
{

    public class EmailSender : EmailService
    {
        private readonly SmtpSettings _emailConfig;

        public EmailSender(SmtpSettings emailConfig)
        {
            _emailConfig = emailConfig;
        }

        public void SendEmail(Message message)
        {
            var emailMessage = CreateEmailMessage(message);
            Send(emailMessage);
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

        private void send(Message message)
        {
            var client = new SmtpSettings()
            {
                client.Server = _emailConfig.Server;
            }

        }
    }
}
