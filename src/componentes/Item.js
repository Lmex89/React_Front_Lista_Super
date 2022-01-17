import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";

export const Item = () => {
    let { Id } = useParams();
    const [loading, setLoading] = useState(false);
    const [datos, setDatos] = useState({})
    const id = Id
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(`http://127.0.0.1:8000/api/v1/super_list/${id}`);
                setDatos(response.data);
                setLoading(true);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    }, [id]);

    
    const submitData = async () => {
        const formData = new FormData();
        formData.append("name", datos.name)
        formData.append("category", datos.category.id)
        formData.append("is_done", datos.is_done)
        formData.append("is_deleted", datos.is_deleted)
        formData.append("quantity", datos.quantity)

        const response = await axios({
            method: "put",
            url: `http://127.0.0.1:8000/api/v1/super_list/${id}`,
            data: formData,
            headers: { "Content-Type": "multipart/form.data" }
        })
    }
    const sendData = (e) => {
        e.preventDefault()
        submitData()
    }
    
    const handleInputChange = event => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }


    return (

        loading ?
            <div>
                <form onSubmit={sendData} >
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Nombre Item</label>
                        <input
                            className="form-control validate"
                            type="text"
                            id="exampleFormControlInput1"
                            placeholder="Nombre"
                            name="name"
                            value={datos.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    &nbsp;
                    &nbsp;
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Cantidad</label>
                        <input
                            className="form-control validate"
                            type="text"
                            id="exampleFormControlInput1"
                            placeholder="1"
                            name="quantity"
                            value={datos.quantity}
                            onChange={handleInputChange}
                        />
                    </div>

                    &nbsp;
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Activo</label>
                        <select
                            className="form-control"
                            id="exampleFormControlSelect1"
                            name='is_done'
                            onChange={handleInputChange}

                        >
                            <option value={datos.is_done} selected disabled> {datos.is_done ?  "True" : "False"} </option>
                            <option value={true} >True</option>,
                            <option value={false}>False</option>
                        </select>
                    </div>


                    <button type="submit" className="btn btn-primary mt-3">Enviar</button>
                </form>
            </div >
            : <h2> No hay datos </h2>
    )
}
