import s from './style.module.css'
import backgroundImg  from '../../images/discontBanner.png'
import gnome from '../../images/gnome.png'
import FormTel from '../FormTel/FormTel'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { applyDiscount } from '../../store/slice/sliceProducts'

export default function BannerDiscount() {

  const telStatus = useSelector(({products}) => products.telStatus)
  const dispatch =useDispatch()


  const handleForm = (data) => {
    axios.post('http://localhost:3333/sale/send',data)
    .then(res => {
      if(!telStatus){
        toast.success("Discount is applied", {icon: false})
        dispatch(applyDiscount())
      }else{
        toast.info("Your discount have already been applied", {icon: false})
      }
      
    })
  }


  return (
    <div
      className={s.container}
      style={{background: `url(${backgroundImg})`}}
    >

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
                border: '1px solid #fff',
                fontSize: '28px', 
                height: 74,
                borderRadius: 25,
              }}  
            
              inputStyle = {{
                fontSize: '18px',
                border: '1px solid #fff'
              }} 
            />
        </div>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            limit={1}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='dark'
        />

    </div>
  )
}
