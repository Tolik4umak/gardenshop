import React from 'react'
import ConteinerLayout from '../../layouts/ConteinerLayout/ConteinerLayout';
import BannerLayout from '../../layouts/BannerLayout/BannerLayout';
import { useSelector } from 'react-redux';
import CategoryItem from '../../components/CategoryItem/CategoryItem';
import saleBannerImg from '../../images/SaleBanner.png'
import flowers from '../../images/flowers.png'
import s from './style.module.css'
import SaleProductsRandom from '../../components/SaleProductsRandom/SaleProductsRandom';
import BannerDiscount from '../../components/BannerDiscont/BannerDiscount';

export default function HomePage() {

  const categories = useSelector(state => state.categories.list)

  return (
    <ConteinerLayout>

        <BannerLayout bannerImg={saleBannerImg}>
          <div className={s.sale_banner}>
            <img src={flowers} className={s.banner_img_1} alt="" />
            <h3 className={s.topic}>Sale</h3>
            <div className={s.decription}>New season</div>
            <button className={s.sale_button}>Sale</button>
          </div>
        </BannerLayout>
        <div className={s.container}>
            {categories.slice(0, 4).map(item => <CategoryItem key={item.id} {...item}/>)}
        </div>
        <BannerDiscount/>
        <SaleProductsRandom/>

    </ConteinerLayout>
  )
}
