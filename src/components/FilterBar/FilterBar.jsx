import React, { useEffect, useState } from 'react'
import s from './style.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { resetProductsFilters, searchFilterByDiscount, searchFilterByPrice, sortFilterProducts } from '../../store/slice/sliceProducts'

export default function FilterBar({checkboxShow}) {
  
  const dispatch = useDispatch()  
  const maxPrice = useSelector(({products}) => products.list.reduce((acc, {price}) => acc < price ? price : acc,0))
  const [minFilterPrice, setMinFilterPrice] = useState(0)  
  const [maxFilterPrice, setMaxFilterPrice] = useState(0)  

  useEffect(() => {
    dispatch(resetProductsFilters())
  }, [])

  const onChamgeMinPrice = (e) =>{
    setMinFilterPrice(e.target.value)
    dispatch(searchFilterByPrice({
      minFilterPrice: +e.target.value || 0,
      maxFilterPrice: +maxFilterPrice || maxPrice,
    }))
  }
    
  const onChamgeMaxPrice = (e) =>{
    setMaxFilterPrice(e.target.value)
    dispatch(searchFilterByPrice({
      minFilterPrice: +minFilterPrice || 0,
      maxFilterPrice: +e.target.value || maxPrice,
    }))
  }
    
  const sortOnChange = (e) => {
    dispatch(sortFilterProducts(e.target.value))
  } 

  return (
    <div className={s.container}>

        <div className={s.sort}>
            <label className={s.title}>Price</label>
            <input 
                onChange={onChamgeMinPrice} 
                className={s.price} 
                name='minPrice' 
                type="number" 
                step={0.1}
                min="0" 
                placeholder='from' />
            <input 
                onChange={onChamgeMaxPrice} 
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
                <option value="date">Date</option>
            </select>
        </div>

    </div>
  )
}
