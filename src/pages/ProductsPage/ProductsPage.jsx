import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import CategoryItem from '../../components/CategoryItem/CategoryItem';
import ConteinerLayout from '../../layouts/ConteinerLayout/ConteinerLayout'

export default function ProductsPage() {

  const {id} = useParams()
  const {list , status, error}  = useSelector(state => {
    if(!id){
      return state.products
    }else{
      const filteredProducts = state.products.list.filter(({categoryId}) => +categoryId === +id)
      return {
        ...state.products,
        list: filteredProducts
      }
    }
  })

  return (
    <ConteinerLayout>

      {
        status === 'rejected'
        ? (
          <div>
              {error}
          </div>
        ): status ===  'resolve' 
        ? (
          <div>
              {list.map(item => <CategoryItem key={item.id} {...item}/>)}
          </div>
        )
        : (
          <div>
              {status}
          </div>
        )
      }
      
    </ConteinerLayout>
  ) 

}
