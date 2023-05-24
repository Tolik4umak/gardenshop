import React from 'react'
import s from './style.module.css'
import FormTel from '../FormTel/FormTel'
import axios from 'axios'

export default function Order({orderPrice, orderList}) {

      
  const handleForm = (data) => {
    if(orderPrice !== 0){
        axios.post('http://localhost:3333/order/send',{
            userInfo: data,
            orderPrice,
            orderList
        })
            .then(res => console.log(res))
    }else{
        console.log('make your order');
    }
    
  }

  return (
    <aside className={s.order}>

        <h2 className={s.title}>Order details</h2>

        <div className={s.info}>
            <p className={s.param}>Total</p>
            <p className={s.price}>{orderPrice}$</p>
        </div>

        <FormTel 
            button={'Order'} 
            sendForm={handleForm} 
            btnStyle = {{
                background: '#339933',
                color: '#fff',
                border: '1px solid #fff',
                fontSize: '28px', 
            }}  
            inputStyle = {{
                fontSize: '18px',
                border: '1px solid #000'
            }} 
        />

    </aside>
  )
}
