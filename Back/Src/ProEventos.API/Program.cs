using Microsoft.EntityFrameworkCore;
using ProEventos.Domain.Models;
using ProEventos.Repository.Context;
using ProEventos.Repository.Interfaces;
using ProEventos.Repository.Repositories;
using ProEventos.Service.Interfaces;
using ProEventos.Service.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IEventoService, EventoService>();


builder.Services.AddScoped<IEventoRepository, EventoRepository>();
builder.Services.AddScoped<IGeralRepository, GeralRepository>();
builder.Services.AddScoped<IPalestranteRepository, PalestranteRepository>();

// Add services to the container.
builder.Services.AddDbContext<ProEventosContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("BancoProEventos")!)
);
builder.Services.AddControllers()
                .AddNewtonsoftJson
                (x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

builder.Services.AddCors();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddOpenApi(); 

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapOpenApi();
}

app.UseCors(
    x => x.AllowAnyHeader()
          .AllowAnyMethod()
          .AllowAnyOrigin()
);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
