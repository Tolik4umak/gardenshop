import React from 'react'
import s from './style.module.css'

export default function BannerLayout({bannerImg, children}) {

  return (
    <div className={s.banner}>
        <img className={s.img} src={bannerImg} alt="" />
        <div className={s.content}>
          {children}
        </div>
       
    </div>
  )
}
