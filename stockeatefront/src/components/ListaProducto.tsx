import { useEffect, useState } from "react";
import { appsettings } from "../settings/appsettings";
import { Container, Row, Col, Table, Button } from "reactstrap";
import Swal from "sweetalert2";
import { IProducto } from "../interfaces/IProducto";
import { useNavigate } from "react-router-dom"

export function ListaProducto() {
  const [productos, setProducto] = useState<IProducto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const listaProducto = async () => {
    const response = await fetch(`${appsettings.apiUrl}Productos/Lista`);
    if (response.ok) {
      const data = await response.json();
      console.log("Productos recibidos:", data);
      setProducto(data);
    } else {
      Swal.fire({
        title: "Error!",
        text: "No se pudo cargar",
        icon: "question"
      });
    }
  };

  useEffect(() => {
    listaProducto();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productos.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const eliminar = async (id: number) => {
    const response = await fetch(`${appsettings.apiUrl}Productos/Eliminar/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      Swal.fire({
        title: "¡Eliminado!",
        text: data.message,
        icon: "success"
        
    }).then(() => {
        window.location.reload();
      });
      

    } else {
      Swal.fire({
        title: "Error!",
        text: "No se pudo eliminar el producto",
        icon: "error"
      });
    }
  };
  
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h4>Lista de productos</h4>
          <hr />
          <Table bordered>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id} >
                  <td>{item.nombre}</td>
                  <td>{item.precio}</td>
                  <td>{item.cantidad}</td>
                  <td>{item.descripcion}</td>
                  <td className="text-center">
                  <Button color="warning" onClick={()=>navigate("/EditarProducto")}>Editar</Button>                  
                  <Button color="danger" onClick={() => eliminar(item.id!)}>Eliminar</Button>  
                </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <Button color="info" onClick={prevPage} disabled={currentPage === 1}>
              ← Anterior
            </Button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <Button color="info" onClick={nextPage} disabled={currentPage === totalPages}>
              Siguiente →
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}