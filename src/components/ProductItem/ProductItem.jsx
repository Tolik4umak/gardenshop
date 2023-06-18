import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import s from './style.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { basketAddNewItem, basketRemove } from '../../store/slice/sliceBasket'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

export default function ProductItem({
    id,
    discont_price,
    image,
    price,
    title
}){

  const basket = useSelector(({basket}) => basket.list)
  const dispatch = useDispatch()
  const [inBasket, setInBasket] = useState(false)
  const basketIcon = useRef()

  useEffect(() => {
    const target = basket.find(prod => prod.id === id)
    if(target){
      setInBasket(true)
      basketIcon.current.classList.add(s.basket_active)
    }
  }, [] )

  const basketIconHandle = (event) => {
    event.preventDefault()
    if(!inBasket){
      dispatch(basketAddNewItem(id))
      basketIcon.current.classList.add(s.basket_active)
      toast.success("The item has been successfully add to basket", {icon: false})
    }else{
      dispatch(basketRemove(id))
      basketIcon.current.classList.remove(s.basket_active)
      toast.success("The item has been remove from basket", {icon: false})
    }
    setInBasket(!inBasket)
  }

  return (
    <Link to={`/gardenshop/product/${id}`} className={s.container}>
        <div className={s.img_wrapper}>
            <img className={s.img} src={image} alt={title} />
        </div>
        <div className={[s.info, !discont_price ? s.hide: ''].join(' ')}>
            <div className={s.final_price}>{discont_price ? discont_price: price}$</div>
            <div className={s.full_price}>{price}$</div>
            <div className={s.discont}>-{((price - discont_price) / price * 100).toFixed(1)}%</div>
        </div>
        <div className={s.title}>{title}</div> 
        <FontAwesomeIcon
          ref={basketIcon}
          className={s.basket_icon} 
          icon={faCartShopping} 
          onClick={basketIconHandle}
        />
    </Link>
  )
  
}
