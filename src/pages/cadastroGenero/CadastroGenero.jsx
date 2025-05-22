import Header from "../../components/header/Header";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import api from "../../Services/services";
import Swal from 'sweetalert2';

const CadastroGenero = () => {

    // nome do genero
    const [genero, setGenero] = useState("");
    const [listaGenero, setListaGenero] = useState([]);


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

    async function cadastrarGenero(evt) {
        evt.preventDefault();
        if (genero.trim() != "") {
            try {
                await api.post("genero", { nome: genero });
                alertar("success", "Cadastro realizado com sucesso!")
                setGenero("");
                listarGenero();
            } catch (error) {
                alertar("error", "Erro! Entre em contato com o suporte.");
            }
        } else {
            alertar("error", "O campo precisa estar preenchido!")
        }
    }


    async function listarGenero() {
        try {
            const resposta = await api.get("genero");
            console.log(resposta.data);
            setListaGenero(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }
    async function excluirGenero(GeneroId) {
        try {
            await api.delete(`genero/${GeneroId.idGenero}`);
            alertar("success", "Gênero deletado com sucesso!");
        } catch (error) {
            alertar("error", "Não foi possível deletar este gênero!");
        }
    }


    async function editarGenero(genero) {
        console.log(genero);
        const { value: novoGenero } = await Swal.fire({
            title: "Modifique seu gênero",
            input: "text",
            inputLabel: "Novo Gênero",
            inputValue: genero.nome,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo não pode estar vazio!";
                }
            }
        });
        if (novoGenero) {
            try {
                console.log(genero.nome);
                console.log(novoGenero);
                
                await api.put(`genero/${genero.idGenero}`, {nome: novoGenero});
                Swal.fire(`Gênero modificado para ${novoGenero}!`);
            } catch (error) {
                console.log(error);
            }
        }   
    }


    // () => uma função anônima ou arrow function
    // "() => {}" = função, "[]" = dependencia

    useEffect(() => {
        listarGenero();
    }, [listaGenero])







    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro de Gênero"
                    visibilidade="none"
                    nomePlace="gênero"

                    // atribuindo a função:
                    funcCadastro={cadastrarGenero}
                    // atribuindo o valor ao input:
                    valorInput={genero}
                    // atribuindo a função que atualiza o meu genero:
                    setValorInput={setGenero}
                />
                <Lista
                    tituloLista="Lista dos Gêneros"
                    visibilidade="none"
                    lista={listaGenero}
                    funcExcluir={excluirGenero}
                    funcEditar={editarGenero}
                    tipoLista = "genero"
                />
            </main>
            <Footer />
        </>
    )
}

export default CadastroGenero;