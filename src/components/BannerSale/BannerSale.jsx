import s from './style.module.css'
import flowers from '../../images/flowers3.png'
import ButtonCust from '../../layouts/ButtonCust/ButtonCust'
import { Link } from 'react-router-dom'



export default function BannerSale() {

    
  return (
    <div className={s.container}>

        <div className={s.content}>
            <h3 className={s.title}>Sale</h3>
            <div className={s.decription}>New season</div>
            <ButtonCust
               w={155}
               h={82}
               fz={25}  
               background={'#232323'}
               color={'#fff'}          
            >
                <Link to={'/products/category/sales'}>Sale</Link>
            </ButtonCust>
        </div>

        <img src={flowers} className={s.flowers} alt="" />
    </div>
  )
}
 