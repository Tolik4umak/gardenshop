import React from 'react'
import ConteinerLayout from '../../layouts/ConteinerLayout/ConteinerLayout'
import { useSelector } from 'react-redux'
import BasketItem from '../../components/BasketItem/BasketItem'
import s from './style.module.css'
import { Link } from 'react-router-dom'
import Order from '../../components/Order/Order'

export default function BasketPage() {

  document.title = 'Basket'

  const basket = useSelector(({basket, products}) => {
    return basket.list.map(item => {
      const target = products.list.find(({id}) => id === item.id)
      return {...target, ...item }
    })
  })

  console.log(basket)
  const orderList = basket.map( ({id, count}) => ({id,count}) )
  const orderPrice = basket.reduce((acc, {price, count, discont_price}) => acc + (discont_price || price)*count , 0)

  return (
    <ConteinerLayout>

    
      {
        basket.length 
        ? (
          <>
            <h2>Shopping Cart</h2>

            <main className={s.container}>
            <div className={s.basket_container}>
              <Link className={s.link} to='/'> Back to store 	&#62; </Link>
              {
                basket.map(item => <BasketItem key={item.id} {...item} />)
              }
            </div>
  
            <aside className={s.order}>
              <Order orderPrice={+orderPrice.toFixed(2)} orderList={orderList}/>
            </aside>      
          </main>
          </>
        ) :
        (
          <h2 className={s.cart_empty}>
            Your card is currently empty ;(
          </h2>
        )
      }
  
    </ConteinerLayout>
  )
}
