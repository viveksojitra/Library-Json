// import ProductForm from "./components/forms/ProductForm"
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/CSS/Add.css'
import './components/CSS/Table.css'
import './components/CSS/Header.css'
import './App.css'
import Header from "./components/header/Header";
import { Route, Routes } from "react-router";
import Home from "./components/pages/Home";
import Add from "./components/pages/Add";
import Update from './components/pages/Update';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addBook" element={<Add />} />
        <Route path="/updateBook/:id" element={<Update />} />
      </Routes>
    </>
  )
}

export default App