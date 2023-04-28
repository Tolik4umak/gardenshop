import React from 'react'
import ConteinerLayout from '../../layouts/ConteinerLayout/ConteinerLayout';
import BannerLayout from '../../layouts/BannerLayout/BannerLayout';
import { useSelector } from 'react-redux';
import CategoryItem from '../../components/CategoryItem/CategoryItem';
import s from './style.module.css'

export default function HomePage() {

  const categories = useSelector(state => state.categories.list)

  return (
    <ConteinerLayout>

        <BannerLayout link={"./images/SaleBanner.png"} size={'1440/600'}/>

        <div className={s.container}>
            {categories.slice(0, 4).map(item => <CategoryItem key={item.id} {...item}/>)}
        </div>

    </ConteinerLayout>
  )
}
