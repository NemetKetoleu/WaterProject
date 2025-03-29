using Microsoft.EntityFrameworkCore;
using WaterProject.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<WaterDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("WaterConnection")));

// This code is setting up "CORS" to allow certain websites to talk to this app safely.
builder.Services.AddCors(options =>
    // We're adding a rule for CORS (Cross-Origin Resource Sharing).
    options.AddPolicy("AllowReactAppBlah",
    policy => {
        // We create a rule called "AllowReactAppBlah" that says:
        policy.AllowAnyOrigin() // Any website can connect to this app (it's open to all websites).
            .AllowAnyMethod() // The app will accept all types of actions, like GET, POST, PUT, etc.
            .AllowAnyHeader(); // The app will accept all types of information that the website wants to send.
    }));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactAppBlah");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();