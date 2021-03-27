using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using SmartSub.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using SmartSub.Data.Entities;
using Hangfire;
using SmartSub.Services.EmailRequest;
using SmartSub.Services;
using MimeKit;

namespace SmartSub
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            
            //connection string config for OS
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                // MSSQL running locally
                services.AddDbContext<DataContext>(options => 
                    options.UseSqlServer(Configuration.GetConnectionString("MSDataContext")), ServiceLifetime.Transient);

                services.AddHangfire(configuration => configuration.UseSqlServerStorage(Configuration.GetConnectionString("MSDataContext")));
                services.AddHangfireServer();
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux) || RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
            {
                // MSSQL running in Docker container
                services.AddDbContext<DataContext>(options =>
                    options.UseSqlServer(Configuration.GetConnectionString("OSXDataContext")), ServiceLifetime.Transient);

                services.AddHangfire(configuration => configuration.UseSqlServerStorage(Configuration.GetConnectionString("OSXDataContext")));
                services.AddHangfireServer();
            }


            services.AddIdentity<User, Role>()
                .AddEntityFrameworkStores<DataContext>();
            
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "SmartSub", Version = "v1" });
            });

            var emailConfig = Configuration
            .GetSection("EmailConfiguration")
            .Get<SmtpSettings>();
            services.AddSingleton(emailConfig);
            services.AddControllers();


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IEmailSender emailSender)
        {
            
            AddRoles(app).GetAwaiter().GetResult();
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "SmartSub v1"));
            }

            app.UseHangfireDashboard();

                // THIS IS THE JOB 
            RecurringJob.AddOrUpdate(
                () => emailSender.send(new MimeMessage()), Cron.Minutely);


            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private static async Task AddRoles(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var roleManager = serviceScope.ServiceProvider.GetService<RoleManager<Role>>();
                if (roleManager.Roles.Any())
                {
                    return;
                }
                
                var role = new Role();
                role.Name = Roles.user;
                await roleManager.CreateAsync(role);
            }
        }


       

    }
}
