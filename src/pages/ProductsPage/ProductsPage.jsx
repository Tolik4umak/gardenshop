import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import ProductItem from '../../components/ProductItem/ProductItem';
import ConteinerLayout from '../../layouts/ConteinerLayout/ConteinerLayout'
import s from './style.module.css'
import FilterBar from '../../components/FilterBar/FilterBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from '../../components/Pagination/Pagination';
import ButtonCust from '../../layouts/ButtonCust/ButtonCust';


export default function ProductsPage() {


  const {id , category} = useParams()
  const curCategory = id === 'all'? 'All products' : id === 'sales' ? 'Products with sale' :  category
 
  const {list , status, error}  = useSelector(state => {
    if(id === 'all'){
      return state.products
    }else if(id === 'sales'){
      const filteredProducts = state.products.list.filter(({discont_price}) => discont_price)
      return {
        ...state.products,
        list: filteredProducts
      }
    }else{
      const filteredProducts = state.products.list.filter(({categoryId}) => +categoryId === +id)
      return {
        ...state.products,
        list: filteredProducts
      }
    }
  })

  const products = list.filter(({show}) => show.price && show.discont && show.keyWords)
                    
  const [productsPerPage, setProductsPerPage] = useState(12)
  const [loader, setLoader] = useState(12)
  const [currentPage, setCurrentPage] = useState(1) 
  const endIndex = currentPage * productsPerPage
  const startIndex = endIndex - loader
  const arrPaginated = products.slice(startIndex, endIndex)
  const totalPages = Math.ceil(products.length / productsPerPage)

  return (
    <ConteinerLayout>

      <h2 className={s.category}>{curCategory}</h2>

      <FilterBar checkboxShow={id !== 'sales'}/>
{/* 
      <button value={8} onClick={(e) => {
        setCurrentPage(Math.floor(startIndex / +e.target.value)+1)
        setProductsPerPage(+e.target.value)
        setLoader(+e.target.value)
      }} >8</button>
      <button value={12} onClick={(e) => {
        setCurrentPage(Math.floor(startIndex / +e.target.value)+1)
        setProductsPerPage(+e.target.value)
        setLoader(+e.target.value)
      }} >12</button>
       <button value={16} onClick={(e) => {
        setCurrentPage(Math.floor(startIndex / +e.target.value)+1)
        setProductsPerPage(+e.target.value)
        setLoader(+e.target.value)
      }} >16</button> */}

      {
        status === 'rejected'
        ? (
          <div>
              {error}
          </div>
        ): status ===  'resolve' 
        ? (
          <div className={s.products}> 
              {
              arrPaginated.map(item => <ProductItem key={item.id} {...item}/>)
              }
          </div>
        )
        : (
          <div>
              {status}
          </div>
        )
      }

      
      <Pagination 
        totalPages = {totalPages} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        loader={loader}
        setLoader={setLoader} 
        productsPerPage={productsPerPage}
      />

      <ToastContainer
          toastClassName={s.custom_toast}
          position="top-center"
          theme='dark'
      />
      
    </ConteinerLayout>
  ) 

}
