import React, { useEffect, useState } from 'react'
import s from './style.module.css'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'

export default function FormSale() {

  const {register, handleSubmit, formState: {errors}} = useForm({
    defaultValues:{
      tel: '+49'
    }
  })
  const onSubmit = data => {
    console.log(data)
    axios.post('http://localhost:3333/sale/send',data)
      .then(res => console.log(res))
  }


  if(errors.tel){
    console.log(errors.tel?.message);
  }

  return (
    <div className={s.container} onSubmit={handleSubmit(onSubmit)}>

      <div className={s.info}>
          5% off 
          <p>on the first order</p>
      </div>

      <form className={s.form}>
        <input 
          className={errors.tel ? s.input: ''}
          {...register('tel', 
            {
              required: true, 
              minLength: {message: `You need more simbols`, value: 13},
              maxLength: {message: `You need less simbols`, value: 14},
              pattern: /^[\d\+][\d\(\)\ -]{4,14}\d$/,
            })} 
          type='tel'
          placeholder='+4912345678900'
        />
        {/* <div>{errors.tel?.message}</div> */}
        <input type='submit' value = 'Get a discount'/>
      </form>

    </div>
  )
}
