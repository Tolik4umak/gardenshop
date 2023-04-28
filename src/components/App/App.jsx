import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import BasketPage from "../../pages/BasketPage/BasketPage";
import CategoriesPage from "../../pages/CategoriesPage/CategoriesPage";
import HomePage from "../../pages/HomePage/HomePage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import ProductsPage from "../../pages/ProductsPage/ProductsPage";
import { fetchCategories } from "../../store/slice/sliceCategories";
import { fetchProducts } from "../../store/slice/sliceProducts";
import s from './style.module.css'


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchProducts())
  },[])

  return (
    <div className={s.wrapper}>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/categories' element={<CategoriesPage/>} />
          <Route path='/products/all' element={<ProductsPage/>} />
          <Route path='/products/:id' element={<ProductsPage/>} />
          <Route path='/sales' element={<ProductsPage/>} />
          <Route path='/basket' element={<BasketPage/>} />
          <Route path='/*' element={<NotFoundPage/>} /> 
        </Routes>
    </div>
  );
}
 
export default App;
