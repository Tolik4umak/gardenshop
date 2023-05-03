import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import s from './style.module.css'
import logo from '../../images/logo.png'
import basket from '../../images/basket_logo.svg'

export default function Nav() {

  const [burger, setBurger ] = useState(false)
  const isActive = ({isActive}) => isActive ? s.active: '' 

  return (
    <div className={[s.container, !burger ? s.burger_menu: ''].join(' ')}>    

        <div className={s.menu_left}>
            <img src={logo}  alt='' />
            <Link className={s.button} to={'/categories'}>Catalog</Link>
        </div>
        <div className={s.menu_rigth}>
           <div className={s.naw_links}>
              <NavLink className={isActive} to={'/'} >Main Page</NavLink>
              <NavLink 
                onClick={() => setBurger(!burger)} 
                className={isActive} 
                to={'/products/category/all'} 
                state = "All products" >
                  All Products
              </NavLink>
              <NavLink 
                onClick={() => setBurger(!burger)} 
                className={isActive} 
                to={'/products/category/sales'}
                state='Products with sale' >
                  All sales
              </NavLink> 
           </div>
            <Link to={'/basket'} >
              <img src={basket}  alt=''/>
            </Link> 
        </div>

        <div onClick={() => setBurger(!burger)} className={s.burger}>X</div>


    </div>
  ) 
}
