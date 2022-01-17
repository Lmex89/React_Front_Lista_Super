import React, { useEffect, useState } from 'react'
import axios from 'axios';

const RowData = (categorie) => {
    const { code, name, id, is_active } = categorie.categorie;
    return (
        
        <option value={id}>{name}</option>
    )
}

const Array = (categories) => {
    const Rows = categories.map(e => {
        return <RowData categorie={e} />
    }
    )
    return Rows
}


const FormItemPost = () => {

    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [datos, setDatos] = useState({
        name: '',
        category: '',
        is_done: false,
        is_deleted: false,
        quantity: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('http://127.0.0.1:8000/api/v1/categories/');
                setCategories(response.data);
                setLoadingCategories(true);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    }, []);

    const handleInputChange = event => {
        console.log(event.target.name, event.target.value)
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const submitData = async () => {
        const formData = new FormData();
        formData.append("name", datos.name)
        formData.append("category", datos.category)
        formData.append("is_done", datos.is_done)
        formData.append("is_deleted", datos.is_deleted)
        formData.append("quantity", datos.quantity)
        const response = await axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/v1/super_list/",
            data: formData,
            headers: { "Content-Type": "multipart/form.data" }
        })
    }

    const sendData = (e) => {
        e.preventDefault()
        submitData()
    }


    return (
        <div>
            <form onSubmit={sendData}>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Nombre Item</label>
                    <input
                        className="form-control validate"
                        type="text"
                        id="exampleFormControlInput1"
                        placeholder="Nombre"
                        name="name"
                        onChange={handleInputChange}
                    />
                </div>
                &nbsp;
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Lista de Categorias</label>
                    <select
                        className="form-control"
                        id="exampleFormControlSelect1"
                        name='category'
                        onChange={handleInputChange}
                    >
                        <option value="" selected disabled hidden>Please select</option>
                        {Array(categories)}
                    </select>
                </div>
                &nbsp;
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Cantidad</label>
                    <input
                        className="form-control validate"
                        type="text"
                        id="exampleFormControlInput1"
                        placeholder="1"
                        name="quantity"
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary mt-3">Enviar</button>
            </form>
        </div>
    )
}

export default FormItemPost;