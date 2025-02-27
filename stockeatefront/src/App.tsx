import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NuevoProducto } from "./components/NuevoProducto";
import Layout from "./components/Layout";
import {ListaProducto} from "./components/ListaProducto";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout envuelve todas las rutas hijas */}
        <Route path="/" element={<Layout />}>
          <Route path="listaproducto" element={<ListaProducto />} />
          <Route path="nuevoproducto" element={<NuevoProducto />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
