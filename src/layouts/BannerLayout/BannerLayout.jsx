import React from 'react'
import s from './style.module.css'

export default function BannerLayout({link, size}) {
  return (
    <div style={
        {
            background: `url(${link}) 0 0/ contain no-repeat`,
            aspectRatio: `${size}`
        }
    } 
        className={s.banner}>
        
    </div>
  )
}
