import React, { useEffect,useState } from 'react'
import axios from 'axios';


const RowData = (categorie) => {
    return (
        <tr>
            <th scope="row"></th>
            <td> {categorie.code}</td>
        </tr>
    )
}


const Table = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('http://127.0.0.1:8000/api/v1/categories/');
                setCategories(response.data);
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <table className="table caption-top">
                <caption>List of users</caption>
                <thead>
                    <tr>
                        <th scope="col">#Code</th>
                        <th scope="col">Name</th>
                        <th scope="col">is Active</th>
                        <th scope="col">Handle</th>
                        <th scope="col">     </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories ? <RowData categorie={categories[0]}/> : ""
                    }

                </tbody>
            </table>
        </>
    )
}
export default Table;