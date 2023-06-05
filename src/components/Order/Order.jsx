import React from 'react'
import s from './style.module.css'
import FormTel from '../FormTel/FormTel'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { basketClear } from '../../store/slice/sliceBasket'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Order({orderPrice, orderList}) {

  const dispatch = useDispatch()       
  const handleForm = (data) => {

    const dataPost = {...data, orderList, orderPrice}
    if(orderList ===  []){
        axios.post('http://localhost:3333/order/send',dataPost)
            .then(res => {
                dispatch(basketClear())
                toast.success("The order submission request has been successfully received", {icon: false})
            })
            .catch(err => {
                toast.error(`${err.message}`, {icon: false})
            })
    }else{
        toast.info("Your cart is empty", {
            icon: false
          })
    }
    
  }

  return (
    <div className={s.order}>

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
                fontWeight: 700,
                height: 76,
                borderRadius: 25,
            }}  
            inputStyle = {{
                fontSize: '18px',
                border: '1px solid #000'
            }} 
        />
       <ToastContainer
            position="top-center"
            autoClose={5000}
            theme='dark'
        />

    </div>
  )
}
