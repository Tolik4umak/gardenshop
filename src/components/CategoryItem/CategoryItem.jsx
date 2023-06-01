import React from 'react'
import { Link } from 'react-router-dom'
import s from './style.module.css'


export default function CategoryItem({id, title, image}) {
  return (
    <Link to={`/products/${title}/${id}`} state={title} className={s.category}>
        <img className={s.img} src={image} alt="" />
        <div className={s.title}>
            {title}
        </div>
    </Link>
  )
}
