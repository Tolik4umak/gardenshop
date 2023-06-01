import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import ProductItem from '../ProductItem/ProductItem'
import s from './style.module.css'

export default function SaleProductsRandom() {

  const productsList = useSelector(state => state.products.list)

  const randomProducts = useMemo(() => {
    return productsList
    .filter(({discont_price}) => discont_price)
    .sort(() => Math.random() -0.5 )
    .slice(0,3)
  })

  return (
    <div className={s.container}>
        {
            randomProducts.map(item => <ProductItem key={item.id} {...item}/>)
        }
    </div>
  )
}

