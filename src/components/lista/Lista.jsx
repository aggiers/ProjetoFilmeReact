import "./Lista.css";
import Editar from "../../assets/img/pen-to-square-solid.svg";
import Excluir from "../../assets/img/trash-can-regular.svg";
const Lista = (props) => {
    return(
        <section className="layout_grid listagem">
            <h1>{props.tituloLista}</h1>
            <hr/>
            <div className="tabela">
                <table>
                    <thead>
                        <tr className="table_cabecalho">
                            <th>Nome</th>
                            <th style={{display:props.visibilidade}}>Gênero</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.lista && props.lista.length > 0 ? (
                            props.lista.map((item) => (
                                <tr className="item_lista" key={props.tipoLista == "genero" ? item.idGenero : item.idFilme}>
                                    <td data-cell="Nome">
                                        {props.tipoLista == "genero" ? item.nome : item.titulo}
                                    </td>
                                    <td data-cell="Genero" style={{display:props.visibilidade}}>
                                        {item.genero?.nome}
                                    </td>
                                    <td data-cell="Editar">
                                        <button className="botao_editar" onClick={() => {props.funcEditar(item)}}>
                                            <img src={Editar} alt="Caneta"/>
                                        </button>
                                    </td>
                                    <td data-cell="Excluir">
                                        <button className="botao_excluir" onClick={() => (props.funcExcluir(item))}>
                                            <img src={Excluir} alt="Lixeira"/>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) :
                        (
                            <p>Nenhum gênero foi encontrado</p>
                        )       
                        }

                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Lista;