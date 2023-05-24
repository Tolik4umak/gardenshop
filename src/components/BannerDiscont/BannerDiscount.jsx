import React, { useEffect, useRef} from 'react'
import s from './style.module.css'
import backgroundImg  from '../../images/discontBanner.png'
import gnome from '../../images/gnome.png'
import FormTel from '../FormTel/FormTel'
import axios from 'axios'


export default function BannerDiscount() {

  const background = useRef()
  useEffect(() => {
    background.current.style.backgroundImage = `url(${backgroundImg})`
  }, [])


  const handleForm = (data) => {
    axios.post('http://localhost:3333/sale/send',data)
    .then(res => console.log(res))
  }


  return (
    <div ref={background} className={s.container}>

        <img src={gnome} className={s.gnome} alt="" />

        <div className={s.form_wrapper}>
            <div className={s.info}>
                5% off 
                <p>on the first order</p>
            </div>
            <FormTel 
              button={'Get a discount'} 
              sendForm={handleForm} 
              btnStyle = {{
                background: 'none',
                color: '#fff',
                border: '1px solid #fff',
                fontSize: '28px', 
              }}  
              inputStyle = {{
                fontSize: '18px',
                border: '1px solid #fff'
              }} 
            />
        </div>

    </div>
  )
}
