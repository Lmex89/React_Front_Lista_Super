import logo from './logo.svg';
import './App.css';
import { BrowserRouter as BRouter, Routes, Route, Link } from "react-router-dom";
import CategoriesList from "./componentes/Categories"
import TableItemsPerCategory from './componentes/TablaperCategpry';
import { PageNotFound } from './componentes/PageNotFound';
import { Item } from './componentes/Item';
import FormCategories from './componentes/FormCategories';
import FormItemPost from './componentes/Listado';
function App() {
  return (
    <BRouter>
      <div className="container mt-5" role="group" aria-label="Basic example">
        <div className="btn-group">
          <div className="btn btn-outline-primary mt-3" >
            <Link to="/categorias_lista">Categorias</Link> |{" "}
          </div>
          <div className="btn btn-outline-primary mt-3" >
            <Link to="/agregar_categorias">Agregar Categoria</Link> |{" "}
          </div>
          <div className="btn btn-outline-primary mt-3" >
            <Link to="/lista_por_categoria">Agregar Item</Link> |{" "}
          </div>
        </div>
        <Routes>
          <Route path="/" />
          <Route exact path="/categorias_lista" element={<CategoriesList />} />
          <Route exact path="/agregar_categorias" element={<FormCategories />} />
          <Route path="/lista_por_categoria/:Id" element={<TableItemsPerCategory />} />
          <Route path="/lista_por_categoria" element={<FormItemPost />} />
          <Route path="/lista_edit/:Id" element={<Item />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BRouter>
    // <div>
    //   <TableItemsPerCategory id={"0ba6ac4b-aa3d-413e-828b-e139d5e5f6bd" }/>
    // </div>

  );
}

export default App;
