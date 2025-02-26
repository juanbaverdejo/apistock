using System.ComponentModel.DataAnnotations;

namespace stockeate.Models
{
    public class Producto
    {

        public int Id { get; set; }
        [Required]
        public string Nombre { get; set; }
        [Required]
        public int Precio { get; set; }
        public int Cantidad { get; set; }
        public string Descripcion { get; set; }

    }
}
