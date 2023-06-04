import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import Nav from '../../components/Nav/Nav'
import s from './style.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons'

export default function ConteinerLayout({children}) {

  window.addEventListener('beforeunload', () => {
    window.scroll(0, 0);
  });

  const [isVisible, setIsVisible] = useState(false)

  const scrollToTop = (e) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  useEffect(()=>{
    const handleScroll = () => {
      const scrollStatus = window.pageYOffset
      setIsVisible(scrollStatus > 300)
    }
    window.addEventListener('scroll',handleScroll)
    return () => window.removeEventListener('scroll',handleScroll)
  },[])




  return (
    <div className={s.container}>
        <Nav/>
        <div className={s.content}>
          {children}
        </div>
        <FontAwesomeIcon 
          className={[s.arrow_up, !isVisible && s.arrow_hide].join(' ')} 
          icon={faCircleArrowUp} 
          onClick={scrollToTop}
        />
        <Footer/>
    </div>
  )
}
