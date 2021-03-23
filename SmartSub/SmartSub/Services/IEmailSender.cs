using System;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;

namespace SmartSub.Services.EmailRequest
{
    public interface IEmailSender
    {
        void SendEmail(Message message);
    }
}
