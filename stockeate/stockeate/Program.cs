using Microsoft.EntityFrameworkCore;
using stockeate.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(opciones => opciones.UseSqlServer(builder.Configuration.GetConnectionString("ConexionSql")));
builder.Services.AddCors(opciones =>
{
    opciones.AddPolicy("NuevaPolitica", app =>
    {
        app.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors("NuevaPolitica"); // Asegúrate de aplicar la política aquí

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await dbContext.Database.MigrateAsync(); // Aplica cualquier migración pendiente
    await ApplicationDbContextSeed.SeedAsync(dbContext); // Insertar datos de ejemplo si es necesario
}

app.UseAuthorization();

app.MapControllers();

app.Run();
public class ApplicationDbContextSeed
{
    public static async Task SeedAsync(AppDbContext context)
    {
        //if (!context.Servicio.Any())
        //{
        //    var servicios = new List<Servicio>
        //    {
        //        new Servicio {Nombre = "Peluqueria", Precio = 9000, Duracion=60},
        //    };

        //    await context.Servicio.AddRangeAsync(servicios);
        //    await context.SaveChangesAsync();
        //}
    }
}