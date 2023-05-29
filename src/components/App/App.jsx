import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import BasketPage from "../../pages/BasketPage/BasketPage";
import CategoriesPage from "../../pages/CategoriesPage/CategoriesPage";
import HomePage from "../../pages/HomePage/HomePage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import ProductSinglePage from "../../pages/ProductSinglePage/ProductSinglePage";
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
          <Route path='/products/category/:id' element={<ProductsPage/>} />
          <Route path='/product/:id' element={<ProductSinglePage/>} />
          <Route path='/basket' element={<BasketPage/>} />
          <Route path='/*' element={<NotFoundPage/>} /> 
          <Route path='/notfound' element={<NotFoundPage/>} /> 
        </Routes>
    </div>
  );
}
 
export default App;
