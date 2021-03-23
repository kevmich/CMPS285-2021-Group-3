using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using MimeKit;
using SmartSub.Data.Entities;

namespace SmartSub.Services
{
    public class EmailService
    {
        
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
