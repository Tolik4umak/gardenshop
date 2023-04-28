import React from 'react'
import Footer from '../../components/Footer/Footer'
import Nav from '../../components/Nav/Nav'
import s from './style.module.css'

export default function ConteinerLayout({children}) {
  return (
    <div className={s.container}>
        <Nav/>
        <div className={s.content}>
          {children}
        </div>
        <Footer/>
    </div>
  )
}
