import React from 'react'
import ConteinerLayout from '../../layouts/ConteinerLayout/ConteinerLayout';
import { useSelector } from 'react-redux';
import CategoryItem from '../../components/CategoryItem/CategoryItem';
import s from './style.module.css'
import SaleProductsRandom from '../../components/SaleProductsRandom/SaleProductsRandom';
import BannerDiscount from '../../components/BannerDiscont/BannerDiscount';
import BannerSale from '../../components/BannerSale/BannerSale';

export default function HomePage() {

  const categories = useSelector(state => state.categories.list)

  return (
    <ConteinerLayout>

        <BannerSale/>
        <div className={s.container}>
            {categories.slice(0, 4).map(item => <CategoryItem key={item.id} {...item}/>)}
        </div>
        <BannerDiscount/>
        <SaleProductsRandom/>

    </ConteinerLayout>
  )
}
