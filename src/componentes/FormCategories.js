import React, { useState } from 'react'
import axios from 'axios';


const FormCategories = () => {

    const [datos, setDatos] = useState({
        name: '',
        code: '',
        is_active: "",
        is_deleted: "",
    })

    const handleInputChange = event => {
        console.log(event.target.name, event.target.value)
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const submitData = async () => {
        const formData = new FormData();
        console.log(datos)
        formData.append("name", datos.name);
        formData.append("code", datos.code);
        formData.append("is_active", datos.is_active);

        console.log("despues del for ", formData)
        const response = await axios({
            method: "post",
            url: "http://127.0.0.1:8000/api/v1/categories/",
            data: formData,
            headers: { "Content-Type": "multipart/form.data" }
        })
    }

    const sendData = (e) => {
        e.preventDefault()
       submitData(datos)
    }


    return (
        <div>
            <form onSubmit={sendData}>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Nombre Categoria</label>
                    <input
                        className="form-control validate"
                        type="text"
                        id="exampleFormControlInput1"
                        placeholder="Nombre"
                        name="name"
                        onChange={handleInputChange}
                    />
                </div>
               
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Code</label>
                    <input
                        className="form-control validate"
                        type="text"
                        id="exampleFormControlInput1"
                        placeholder="1"
                        name="code"
                        onChange={handleInputChange}
                    />
                </div>

                &nbsp;
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Activo</label>
                    <select
                        className="form-control"
                        id="exampleFormControlSelect1"
                        name='is_active'
                        onChange={handleInputChange}

                    >
                        <option value="" selected disabled hidden>Please select</option>
                        <option value={true} >True</option>,
                        <option value={false}>False</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary mt-3">Enviar</button>
            </form>
        </div>
    )
}

export default FormCategories;