import { ChangeEvent,useEffect,useState } from "react"
import { appsettings } from "../settings/appsettings"
import { Link, useNavigate } from "react-router-dom"
import { IProducto } from "../interfaces/IProducto"
import { Container,Row,Col,Form,FormGroup,Label,Input,Button, Table } from "reactstrap"
import Swal from "sweetalert2"

export function ListaProducto()
{
    const[producto,setProducto] = useState<IProducto[]>([]);

    const listaProducto = async() => {
            const response = await fetch(`${appsettings.apiUrl}Productos/Lista`)
            
            if(response.ok){
                const data = await response.json();
                setProducto(data)
            }else{
                Swal.fire({
                    title:"Error!",
                    text:"No se pudo cargar",
                    icon:"question"
                })
            }
        }
    useEffect(
        () => {
            listaProducto()
        },[]
    )

    return(
        <Container className="mt-5">
            <Row>
                <Col>
                    <h4>Lista de productos</h4>
                    <hr></hr>

                <Table bordered>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Descripcion</th>
                            
                        </tr>
                    </thead>
                <tbody>
                    {
                        producto.map((item)=>(
                            <tr key={item.idProducto}>
                            <td>{item.nombre}</td>
                            <td>{item.precio}</td>
                            <td>{item.cantidad}</td>
                            <td>{item.descripcion}</td>

                            </tr>
                            
                        ))
                    }
                </tbody>

                </Table>
                </Col>
            </Row>
        </Container>
    )
}