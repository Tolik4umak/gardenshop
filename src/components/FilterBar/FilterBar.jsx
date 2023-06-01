import React, { useEffect, useRef, useState } from 'react'
import s from './style.module.css'
import { useDispatch } from 'react-redux'
import { resetProductsFilters, searchFilterByDiscount, searchFilterByKeyWords, searchFilterByPrice, sortFilterProducts } from '../../store/slice/sliceProducts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons'

export default function FilterBar({checkboxShow}) {
  
  const dispatch = useDispatch()  
  const [keyWords, setKeyWords] = useState('') 
  const [price, setPrice] = useState({min: 0, max: Infinity})  
  const [isDiscount, setIsDiscount] = useState(false)
  const modal = useRef()

  useEffect(() => {
    dispatch(searchFilterByPrice(price))
    dispatch(searchFilterByKeyWords(keyWords))
    dispatch(searchFilterByDiscount(isDiscount))
  }, [price, keyWords,isDiscount])


  useEffect(() => {
    dispatch(resetProductsFilters())
  }, [])


  const handleKeyWords = ({target}) => {
    setKeyWords(target.value)
  } 
  const minHandler = ({target}) => {
    setPrice({...price, min: +target.value})
  }
  const maxHandler = ({target}) => {
    setPrice({...price, max: +target.value || Infinity})
  }
  const handleCheckbox = ({target}) => {
    setIsDiscount(target.checked)
  }
  const sortOnChange = (e) => {
    dispatch(sortFilterProducts(e.target.value))
  } 


  const handleFilterModal = () => {
    modal.current.classList.toggle(s.mobile_modal)
  }
  const removeFilterMin = () => {
    setPrice({...price, min: ''})
  }
  const removeFilterMax = () => {
    setPrice({...price, max: Infinity})
  }

  return (
    <div className={s.wrapper}>

      <div className={s.wrapper_container} ref={modal}>
        <div className={s.container} >

            <FontAwesomeIcon 
              icon={faXmark} 
              onClick={handleFilterModal} 
              className={s.close_button}
            />

            <input 
              type="text" 
              placeholder='search...' 
              className={[s.search ,s.field].join(' ')}
              value={keyWords} 
              onChange={handleKeyWords}
            />
    
            <div className={s.sort}>
                <label className={s.title}>Price</label>
                <input 
                    onChange={minHandler}
                    value={price.min === 0 ? '' : price.min}
                    className={[s.price ,s.field].join(' ')} 
                    name='minPrice' 
                    type="number" 
                    step={0.1}
                    min="0" 
                    placeholder='from' />
                <input 
                    onChange={maxHandler}
                    value={price.max === 0  ? '' : price.max}
                    className={[s.price ,s.field].join(' ')} 
                    name='maxPrice' 
                    type="number" 
                    step={0.1}
                    min="0" 
                    placeholder='to' />
            </div>
    
             <div className={[s.sort, !checkboxShow ? s.hidden : ''].join(' ')}>
                <label className={s.title}>Discounted items</label>
                <input
                  onChange={handleCheckbox} 
                  className={s.discount} 
                  id='discount' 
                  type='checkbox'
                  checked={isDiscount}
                />
                <label className={s.checkbox_label} htmlFor="discount">
                    {/* <i className={[s.icon, "las la-check"].join(' ')}></i> */}
                    <FontAwesomeIcon className={s.icon} icon={faCheck} />
                </label>
            </div>
    
             <div className={s.sort}>
                <label className={s.title}>Sorted</label>
                <select defaultValue='default' onChange={sortOnChange} className={[s.select ,s.field].join(' ')}>
                    <option value="default" disabled>Default</option>
                    <option value="priceAscending">Price Ascending</option>
                    <option value="priceDescending">Price Descending</option>
                    <option value="name">Name</option>
                </select>
            </div>

        </div>
      </div>

      <div className={s.filters_mobile}>
        <FontAwesomeIcon 
          icon={faFilter} 
          className={s.filter_icon}
          onClick={handleFilterModal} 
        />
    

        {
          !keyWords 
          ? ('')
          : (
            <div className={s.filter_option}>
              {keyWords}
              <FontAwesomeIcon icon={faXmark} onClick={() => setKeyWords('')}/>
            </div>
          ) 
        }
        {
          !price.min 
          ? ('')
          : (
            <div className={s.filter_option}>
              min: {price.min }
              <FontAwesomeIcon icon={faXmark} onClick={removeFilterMin}/>
            </div>
          ) 
        }
         {
          !price.max || price.max === Infinity
          ? ('')
          : (
            <div className={s.filter_option}>
              max: {price.max}
              <FontAwesomeIcon icon={faXmark} onClick={removeFilterMax}/>
            </div>
          ) 
        }
         {
          isDiscount
          ? (
            <div className={s.filter_option}>
              only Discount
              <FontAwesomeIcon icon={faXmark} onClick={() => setIsDiscount(false)} />
            </div>
          ):('') 
        }
      </div>

      
    </div>
  )
}
