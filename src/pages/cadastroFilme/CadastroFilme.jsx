
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import { use, useEffect, useState } from "react";
import api from "../../Services/services";
import Swal from 'sweetalert2';


const CadastroFilme = () => {

    // só usamos o UseState quando precisamos guardar 
    // uma informação que muda e o react precisa acompanhar

    const [filme, setFilme] = useState("");
    const [genero, setGenero] = useState("");
    const [listaGenero, setListaGenero] = useState([]);
    const [listaFilme, setListaFilme] = useState ([]);

    function alertar(icone, mensagem) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: icone,
                title: mensagem
            });
        }

    async function listarGenero(){
        try {
            const resposta = await api.get("genero");
            setListaGenero(resposta.data);
        } catch (error) {
            console.log(error);
            
        }
    }

    async function listarFilme(){
        try {
            const resposta = await api.get("filme")
            setListaFilme(resposta.data)
        } catch (error) {
            console.log(error);
            
        }
    }


    async function cadastrarFilme(evt){
        evt.preventDefault();
        if(filme.trim() != ""){
            try {
                await api.post("filme", {titulo: filme, idGenero: genero});
                alertar("sucess","cadastroooooooooooooo");
                setFilme("");
                setGenero("");
                
            } catch (error) {
                alertar("error","burrakkkj")
            }
        } else {
            alertar("error","tem que preencher menina burrakkj")

        }
    }


    async function excluirFilme(FilmeId) {
        try {
            await api.delete(`filme/${FilmeId.idFilme}`);
            alertar("success", "Filme deletado com sucesso!");
        } catch (error) {
            alertar("error", "Não foi possível deletar este filme!");
        }
    }








    useEffect(() => {
        listarGenero();
        listarFilme();
    }, []);

    
    return(
        <>
            <Header/>
        <main>
            <Cadastro 
                tituloCadastro = "Cadastro de Filme"
                nomePlace = "filme"
                // atribuindo a função:
                lista = {listaGenero}
                funcCadastro = {cadastrarFilme}

                valorInput = {filme}
                setValorInput = {setFilme}

                valorSelect = {genero}
                setValorSelect = {setGenero}
            />
            <Lista 
                tituloLista = "Lista dos Filmes"
                lista = {listaFilme}
                tipoLista = "filme"
                funcExcluir = {excluirFilme}
                
                
            />
        </main>
            <Footer/>
        </>
    )
}

export default CadastroFilme;