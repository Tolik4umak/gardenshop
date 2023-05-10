import React from 'react'
import s from './style.module.css'

export default function BasketItem({ 
    id,
    count,
    categoryId,
    description,
    discont_price,
    image,
    price,
    title,
}) {


  return (
    <div className={s.container}>
        <img className={s.img} src={image} alt={title} />
        <div className="">
            <h3>{title}</h3>
            <div className="">
                <button>-</button>
                <div className="">{count}</div>
                <button>+</button>
            </div>
        </div>
        <div className="">{price}</div>
        <div style={discont_price ? {display: "block"} : {display: 'none'}} className="">{discont_price}</div>
    </div>
  )
}
