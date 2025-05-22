import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import CadastroFilme from "../pages/cadastroFilme/CadastroFilme";
import CadastroGenero from "../pages/cadastroGenero/CadastroGenero";

const Rotas = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/Filme" element={<CadastroFilme/>}/>
                <Route path="/Genero" element={<CadastroGenero/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;