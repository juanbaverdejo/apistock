import { ChangeEvent,useState } from "react"
import { appsettings } from "../settings/appsettings"
import { useNavigate } from "react-router-dom"
import { IProducto } from "../interfaces/IProducto"
import { Container,Row,Col,Form,FormGroup,Label,Input,Button } from "reactstrap"
import Swal from "sweetalert2"

const initialProducto ={
    nombre:"",
    precio:0,
    cantidad:0,
    descripcion:""
}

export function NuevoProducto(){
    const[producto,setProducto] = useState<IProducto>(initialProducto);
    const navigate = useNavigate();
    const inputChangeValue = (event:ChangeEvent<HTMLInputElement>)=>{
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setProducto({...producto,[inputName] : inputValue})
    }
    const guardar = async() => {
        const response = await fetch(`${appsettings.apiUrl}Producto/Nuevo`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(producto)
        })
        if(response.ok){
            navigate("/")
        }else{
            Swal.fire({
                title:"Error!",
                text:"No se pudo guardar",
                icon:"question"
            })
        }
    }
    const volver = () => {
        navigate("/")
    }

    
    return(
        <Container className="mt-5">
            <Row>
                <Col sm={{size:8,offset:2}}>
                <h4>Nuevo Producto</h4>
                <hr></hr>
                <Form>
                    <FormGroup className="mb-3">
                        <Label>Nombre</Label>
                        <Input type="text" name="nombre" onChange={inputChangeValue} value={producto.nombre}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Correo</Label>
                        <Input type="text" name="correo" onChange={inputChangeValue} value={producto.descripcion}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Sueldo</Label>
                        <Input type="text" name="sueldo" onChange={inputChangeValue} value={producto.precio}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Sueldo</Label>
                        <Input type="text" name="sueldo" onChange={inputChangeValue} value={producto.cantidad}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Sueldo</Label>
                        <Input type="text" name="sueldo" onChange={inputChangeValue} value={producto.precio}></Input>
                    </FormGroup>
                </Form>
                <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>
                <Button color="secondary" onClick={volver}>Volver</Button>
    
                </Col>
            </Row>
        </Container>
    )
}
