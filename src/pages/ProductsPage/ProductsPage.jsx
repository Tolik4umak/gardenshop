import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import ProductItem from '../../components/ProductItem/ProductItem';
import ConteinerLayout from '../../layouts/ConteinerLayout/ConteinerLayout'
import s from './style.module.css'
import FilterBar from '../../components/FilterBar/FilterBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

  // console.log(list);


  return (
    <ConteinerLayout>

      <h2 className={s.category}>{curCategory}</h2>

      <FilterBar checkboxShow={id !== 'sales'}/>
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
              list
                .filter(({show}) => show.price && show.discont && show.keyWords)
                .map(item => <ProductItem key={item.id} {...item}/>)
              }
          </div>
        )
        : (
          <div>
              {status}
          </div>
        )
      }

      <ToastContainer
          toastClassName={s.custom_toast}
          position="top-center"
          theme='dark'
      />
      
    </ConteinerLayout>
  ) 

}
