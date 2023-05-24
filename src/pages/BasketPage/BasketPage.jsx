import React from 'react'
import ConteinerLayout from '../../layouts/ConteinerLayout/ConteinerLayout'
import { useSelector } from 'react-redux'
import BasketItem from '../../components/BasketItem/BasketItem'
import s from './style.module.css'
import { Link } from 'react-router-dom'
import Order from '../../components/Order/Order'

export default function BasketPage() {

  const basket = useSelector(({basket, products}) => {
    return basket.list.map(item => {
      const target = products.list.find(({id}) => id === item.id)
      return{...target, ...item }
    })
  })

  const orderPrice = basket.reduce((acc, {price, count, discont_price}) => acc + (discont_price || price)*count , 0)

  console.log(basket);

  return (
    <ConteinerLayout>

      <h2>Shopping Cart</h2>
    
      <main className={s.container}>

         <div className={s.basket_Container}>
          <Link className={s.link} to='/'> Back to store 	&#62; </Link>
           {
            basket.map(item => <BasketItem key={item.id} {...item} />)
           }
         </div>

         <Order orderPrice={orderPrice} orderList={basket.map( ({id, count}) => ({id,count}) )}/>
      
      </main>
  
    </ConteinerLayout>
  )
}
