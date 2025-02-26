using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using stockeate.Data;
using stockeate.Models;

namespace stockeate.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private AppDbContext dbcontext;

        public ProductosController(AppDbContext _context)
        {
            dbcontext = _context;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            var listaProductos = await dbcontext.Producto.ToListAsync();
            return StatusCode(StatusCodes.Status200OK,listaProductos);
        }
        [HttpGet]
        [Route("Producto/{idProducto:int}")]
        public async Task<IActionResult> Producto(int idProducto)
        {
            var producto = await dbcontext.Producto.FirstOrDefaultAsync(x => x.Id == idProducto);
            return StatusCode(StatusCodes.Status200OK, producto);
        }
        [HttpPost]
        [Route("Crear")]
        public async Task<IActionResult> Crear([FromBody] Producto producto)
        {
            dbcontext.Producto.Add(producto);
            await dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, new {message = "Producto Creado con exito"});
        }
        [HttpPut]
        [Route("Editar/{id:int}")]
        public async Task<IActionResult> Editar([FromBody]Producto producto)
        {
            dbcontext.Producto.Update(producto);
            await dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, new { message = "Producto Editado con exito" });
        }
        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            var empleado = await dbcontext.Producto.FirstOrDefaultAsync(x => x.Id == id);
            dbcontext.Producto.Remove(empleado);
            await dbcontext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, new { message = "Producto Eliminado con exito" });
        }
    }
}
