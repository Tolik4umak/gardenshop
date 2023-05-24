import React, { useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import s from './style.module.css'
import logo from '../../images/logo.png'
import basket from '../../images/basket_logo.svg'
import { useSelector } from 'react-redux'

export default function Nav() {

  const burger = useRef()
  const isActive = ({isActive}) => isActive ? s.active: '' 
  const basketCount = useSelector(({basket}) => basket.list.reduce((acc, {count}) => acc + count, 0))

  const burgerHandler = () => {
    burger.current.classList.toggle(s.burger_menu)
  }

  useEffect(() => {
    burger.current.classList.add(s.burger_menu)
  },[])

  return (
    <div ref={burger} className={s.container}>    

        <div className={s.menu_left}>
            <Link to={'/'}><img src={logo}  alt='' /></Link>
            <Link className={s.button} to={'/categories'}>Catalog</Link>
        </div>
        <div className={s.menu_rigth}>
           <div className={s.naw_links}>
              <NavLink 
                className={isActive} 
                to={'/'}
                onClick={burgerHandler} 
              >
                  Main Page
              </NavLink>
              <NavLink 
                onClick={burgerHandler} 
                className={isActive} 
                to={'/products/category/all'} 
                state = "All products" >
                  All Products
              </NavLink>
              <NavLink 
                onClick={burgerHandler} 
                className={isActive} 
                to={'/products/category/sales'}
                state='Products with sale' >
                  All sales
              </NavLink> 
           </div>
            <Link  
              to={'/basket'} 
              data-count={basketCount} 
              className={s.basket}
              onClick={burgerHandler}  
            >
              <img src={basket}  alt=''/>
            </Link> 
        </div>

        <div onClick={burgerHandler} className={s.burger}>X</div>


    </div>
  ) 
}
