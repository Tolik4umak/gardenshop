import s from './style.module.css'
import backgroundImg  from '../../images/SaleBanner.png'
import flowers from '../../images/flowers.png'
import ButtonCust from '../../layouts/ButtonCust/ButtonCust'
import { Link } from 'react-router-dom'



export default function BannerSale() {

    
  return (
    <div 
        className={s.container}
        style={{background: `url(${backgroundImg})`}}
    >

        <div className={s.content}>
            <h3 className={s.title}>Sale</h3>
            <div className={s.decription}>New season</div>
            <ButtonCust
               w={155}
               h={82}
               fz={25}  
               background={'#fff'}
               color={'#000'}          
            >
                <Link to={'/products/category/sales'}>Sale</Link>
            </ButtonCust>
        </div>

        <img src={flowers} className={s.flowers} alt="" />
    </div>
  )
}
 