import React from 'react'
import s from './style.module.css'
import { useDispatch } from 'react-redux'
import { basketAddNewItem, basketDecrement, basketIncrement, basketRemove } from '../../store/slice/sliceBasket'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

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

  const dispatch = useDispatch()

  return (
    <div className={s.container}>
        <img className={s.img} src={image} alt={title} />

        <h3 className={s.title}>{title}</h3>
        <div className={s.count_bar}>
            <button onClick={() => dispatch(basketDecrement(id))}>-</button>
            <div className={s.count} >{count}</div>
            <button onClick={() => dispatch(basketIncrement(id))} >+</button>
        </div>

        <div className={s.price}>
           <div className={s.cur_price}>{ discont_price? discont_price : price}$</div>
           <div className={discont_price ?  s.old_price : s.hidden}>{price}$</div>
         </div>

        <FontAwesomeIcon 
          onClick={() => dispatch(basketRemove(id))}
          className={s.remove_icon}
          icon={faXmark} 
        />
    </div>

    
  )
}
