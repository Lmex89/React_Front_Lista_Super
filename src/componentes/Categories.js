import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BrowserRouter as BRouter, Routes, Route, Link } from "react-router-dom";
import TableItemsPerCategory from './TablaperCategpry';


const CategoriesList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('http://127.0.0.1:8000/api/v1/categories/');
                setCategories(response.data);
                setLoading(true);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    }, []);

    const RowData = (categorie) => {
        let str1 = "lista_por_categoria/"
        const { code, name, id, is_active } = categorie.categorie;
        return (
            <tr>
                <th scope="row">{code}</th>
                <td>{name}</td>
                <td>{is_active ? "True" : "False"}</td>
                <td>
                    <div className="btn btn-outline-primary mt-3" >
                        <Link to={`/lista_por_categoria/${id}`}>
                            Ver Lista
                        </Link> |{" "}
                    </div>
                </td>
            </tr>
        )
    }

    const Array = (categories) => {
        const Rows = categories.map(e => {
            return <RowData categorie={e} />
        }
        )
        return Rows
    }


    return (
        loading ?
            <div className="table-responsive">
                <table className="table caption-top  table-hover">
                    <caption>Lista de Categorias </caption>
                    <thead>
                        <tr>
                            <th scope="col">#Code</th>
                            <th scope="col">Name</th>
                            <th scope="col">is Active</th>
                            <th scope="col"> Vista </th>
                            <th scope="col">     </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories ? Array(categories) : ""
                        }

                    </tbody>
                </table>
            </div>
            : <h2>No hay datos</h2>

    )
}
export default CategoriesList;