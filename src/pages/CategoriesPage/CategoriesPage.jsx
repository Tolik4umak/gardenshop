import React from 'react'
import { useSelector } from 'react-redux'
import CategoryItem from '../../components/CategoryItem/CategoryItem'
import ConteinerLayout from '../../layouts/ConteinerLayout/ConteinerLayout'
import s from './style.module.css'

export default function CategoriesPage() {
  document.title = 'All Categories';
  const categories = useSelector(state => state.categories.list)
  return (
    <ConteinerLayout>
      <div className={s.container}>
        {
          categories.map(item => <CategoryItem key={item.id} {...item}/>)
        }
      </div>
    </ConteinerLayout>
   
  )
}
