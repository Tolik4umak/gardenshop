import React from 'react'
import { useSelector } from 'react-redux'
import ProductItem from '../ProductItem/ProductItem'
import s from './style.module.css'

export default function SaleProductsRandom() {

  const randomProducts = useSelector(state => {
    // const discontProducts =  state.products.list.filter(({discont_price}) => discont_price)
    // return getRandomList(discontProducts, 3)
                                                                    
    return state.products.list
    .filter(({discont_price}) => discont_price)
    .sort(() => Math.random() -0.5 )
    .slice(0,3)
          
  })
  
  // function getRandomList(arr, leng = 1){
  //   if(leng < 1 || typeof leng !== 'number') leng = 1
  //   if(leng > arr.length) leng = arr.length

  //   const randomProducts = [...new Array(leng)].map(item => {
  //       const randomNum = Math.floor(Math.random() * arr.length)
  //       return arr.splice(randomNum,1)[0]
  //   })

  //   return randomProducts
  // } 

  return (
    <div className={s.container}>
        {
            randomProducts.map(item => <ProductItem key={item.id} {...item}/>)
        }
    </div>
  )
}
