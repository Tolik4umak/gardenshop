import React, { useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import s from './style.module.css'
import logo from '../../images/logo.png'
import basket from '../../images/basket_logo.svg'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import ButtonCust from '../../layouts/ButtonCust/ButtonCust'


export default function Nav() {

  const burger = useRef()
  const isActive = ({isActive}) => isActive ? s.active: '' 
  const basketCount = useSelector(({basket}) => basket.list.reduce((acc, {count}) => acc + count, 0))

  const burgerHandler = () => {
    burger.current.classList.toggle(s.burger_menu)
    if(burger.current.classList.contains(s.burger_menu) && document.body.clientWidth <= 768){
      document.body.style.overflow = 'visible'
    }else if(document.body.clientWidth <= 768){
      document.body.style.overflow = 'hidden'
    }
  }

  useEffect(() => {
    burger.current.classList.add(s.burger_menu)
  },[])

  return (
    <div ref={burger} className={s.container}>    

        <div className={s.menu_left}>
            <Link onClick={burgerHandler} to={'/'}><img src={logo}  alt='' /></Link>
            <ButtonCust
              w={125}
              h={50}
              fz={16}
              borderRadius={5}
            >
              <Link onClick={burgerHandler} to={'/categories'}>Catalog</Link>
            </ButtonCust>
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

          <FontAwesomeIcon onClick={burgerHandler} className={s.burger_bar} icon={faBars} />
          <FontAwesomeIcon onClick={burgerHandler} className={s.burger_xmark} icon={faXmark} />
    
    </div>
  ) 
}
