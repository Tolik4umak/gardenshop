import React, { useEffect, useState } from 'react'
import s from './style.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { resetProductsFilters, searchFilterByDiscount, searchFilterByPrice, sortFilterProducts } from '../../store/slice/sliceProducts'

export default function FilterBar({checkboxShow}) {
  
  const dispatch = useDispatch()  

  const [price, setPrice] = useState({min: 0, max: Infinity})  

  useEffect(() => {
    dispatch(searchFilterByPrice(price))
  }, [price])


  useEffect(() => {
    dispatch(resetProductsFilters())
  }, [])


  const minHandler = ({target}) => {
    setPrice({...price, min: +target.value})
  }
  const maxHandler = ({target}) => {
    setPrice({...price, max: +target.value || Infinity})
  }


    
  const sortOnChange = (e) => {
    dispatch(sortFilterProducts(e.target.value))
  } 

  return (
    <div className={s.container}>

        <div className={s.sort}>
            <label className={s.title}>Price</label>
            <input 
                onChange={minHandler}
                value={price.min === 0 ? '' : price.min}
                className={s.price} 
                name='minPrice' 
                type="number" 
                step={0.1}
                min="0" 
                placeholder='from' />
            <input 
                onChange={maxHandler}
                value={price.max === 0  ? '' : price.max}
                className={s.price} 
                name='maxPrice' 
                type="number" 
                step={0.1}
                min="0" 
                placeholder='to' />
        </div>

         <div className={[s.sort, !checkboxShow ? s.hidden : ''].join(' ')}>
            <label className={s.title}>Discounted items</label>
            <input 
              onChange={(e) => dispatch(searchFilterByDiscount(e.target.checked))} 
              className={s.discount} 
              id='discount' 
              type='checkbox'
            />
            <label className={s.checkbox_label} htmlFor="discount">
                <i className={[s.icon, "las la-check"].join(' ')}></i>
            </label>
        </div>

         <div className={s.sort}>
            <label className={s.title}>Sorted</label>
            <select defaultValue='default' onChange={sortOnChange} className={s.select}>
                <option value="default" disabled>Default</option>
                <option value="priceAscending">Price Ascending</option>
                <option value="priceDescending">Price Descending</option>
                <option value="name">Name</option>
            </select>
        </div>

    </div>
  )
}
