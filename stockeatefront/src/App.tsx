import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NuevoProducto } from "./components/NuevoProducto"

function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/nuevoproducto" element={<NuevoProducto></NuevoProducto>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App