import React, { useEffect } from 'react'
import Footer from '../../components/Footer/Footer'
import Nav from '../../components/Nav/Nav'
import s from './style.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons'

export default function ConteinerLayout({children}) {

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  useEffect(() => {
    scrollToTop()
  },[])


  return (
    <div className={s.container}>
        <Nav/>
        <div className={s.content}>
          {children}
        </div>
        <FontAwesomeIcon 
          className={s.arrow_up} 
          icon={faCircleArrowUp} 
          onClick={scrollToTop}
        />
        <Footer/>
    </div>
  )
}
