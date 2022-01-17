import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';

import { Link } from 'react-router-dom';


const TableItemsPerCategory = () => {

    const [Items, setListaItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [datos, setDatos] = useState({
        name: '',
        category: '',
        is_done: false,
        is_deleted: false,
        quantity: '',
    })
    let { Id } = useParams();
    const id = Id
    console.log(Id, "dentro de table per category",)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(`http://127.0.0.1:8000/api/v1/list_per_category/${id}`);
                setListaItems(response.data);
                setLoading(true);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    }, [id]);

    

    const RowData = (item) => {
        const {id, name, category, is_done, quantity } = item.item;
        console.log(name, category)
        return (
            <tr>
                <th scope="row">{name}</th>
                <td>{category.name}</td>
                <td>{is_done ? "True" : "False"}</td>
                <td>{quantity}</td>
                <td>
                    <div className="btn btn-outline-primary mt-3" >
                        <Link to={`/lista_edit/${id}`}>
                            Editar
                        </Link> |{" "}
                    </div>
                </td>
            </tr>
        )
    }

    const Array = (items) => {
        const Rows = items.map(e => {
            return <RowData item={e} />
        }
        )
        return Rows
    }

    return (
        loading ?
            <div className="table-responsive">
                <table className="table caption-top  table-hover">
                    <caption>
                        <h3>
                            Lista por Categoria
                        </h3>
                    </caption>
                    <thead>
                        <tr>
                            <th scope="col"> Nombre</th>
                            <th scope="col"> Categoria</th>
                            <th scope="col"> Terminado </th>
                            <th scope="col"> Cantidad</th>
                            <th scope="col">     </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Items ? Array(Items) : ""
                        }

                    </tbody>
                </table>
            </div>
            : <h2>No hay datos</h2>

    )
}
export default TableItemsPerCategory;