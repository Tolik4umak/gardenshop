import React from 'react'
import ConteinerLayout from '../../layouts/ConteinerLayout/ConteinerLayout'
import { useSelector } from 'react-redux'
import BasketItem from '../../components/BasketItem/BasketItem'

export default function BasketPage() {

  const basket = useSelector(({basket, products}) => {
    return basket.list.map(item => {
      const target = products.list.find(({id}) => id === item.id)
      return{...target, ...item }
    })
  })

  console.log(basket);

  return (
    <ConteinerLayout>
       <h2>Shopping Cart</h2>

       {
        basket.map(item => <BasketItem key={item.id} {...item} />)
       }

    </ConteinerLayout>
  )
}
