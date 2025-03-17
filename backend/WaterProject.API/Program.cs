using Microsoft.EntityFrameworkCore;
using WaterProject.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// This code adds our Water database context to the services collection.
builder.Services.AddDbContext<WaterDbContext>(options =>
{
    // Get the connection string named "WaterConnection" from the  appsettings.json
    options.UseSqlite(builder.Configuration.GetConnectionString("WaterConnection"));
});
builder.Services.AddCors();
// This line adds CORS (Cross-Origin Resource Sharing) services to the application.
// It allows the app to accept requests from different origins (domains).


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x.WithOrigins("http://localhost:3000"));

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
