import React from 'react'
import { Link } from 'react-router-dom'
import s from './style.module.css'

export default function ProductItem({
    id,
    categoryId,
    createdAt,
    description,
    discont_price,
    image,
    price,
    title,
    updatedAt,
}) {

  const onClick = (e) => {
    e.preventDefault()
  }  
  

  return (
    <Link to={`/product/${id}`} className={s.container}>
        <div className={s.img_wrapper}>
            <img className={s.img} src={image} alt={title} />
            <button onClick={onClick} className={s.to_basket}>Add to cart</button>
        </div>
        <div className={[s.info, !discont_price ? s.hide: ''].join(' ')}>
            <div className={s.final_price}>{discont_price ? discont_price: price}$</div>
            <div className={s.full_price}>{price}$</div>
            <div className={s.discont}>{((price - discont_price) / price * 100).toFixed(1)}%</div>
        </div>
        <div className={s.title}>{title}</div>

        
    </Link>
  )
  
}
