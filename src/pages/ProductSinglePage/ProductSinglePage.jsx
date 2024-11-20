import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ConteinerLayout from '../../layouts/ConteinerLayout/ConteinerLayout'
import s from './style.module.css'
import { basketAddNewItem } from '../../store/slice/sliceBasket'
import ButtonCust from '../../layouts/ButtonCust/ButtonCust'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Zoom from '../../components/Zoom/Zoom'

export default function ProductSinglePage() {

    
  const navigate = useNavigate()  
  const {id} = useParams() 
  const dispatch = useDispatch()
  const {product, status, error} = useSelector(state => {
    const {list, ...rest} = state.products
    return{
        ...rest,
        product: list.find(item => item.id === +id)
    }
  })
  
  useEffect(() => {
    if(!product && status === 'resolve'){            
        navigate('/notfound')        
    }
  } ,[status])

  const handleOnCLick = () => {
    dispatch(basketAddNewItem(+id))
    toast.success("The item has been successfully add to basket", {icon: false})
  }



  function render(){


    if(status === 'loading'){
        return (
            <ConteinerLayout>
                <div>{status}</div>
            </ConteinerLayout>   
        )
    }else if(status === 'rejected'){
        return (
            <ConteinerLayout>
               <div>{error}</div>
            </ConteinerLayout> 
        )
    }
    
    if(status === 'resolve' && product){

        const {id, image, price, discount_price , title, description } = product
        document.title = `Product - ${title.slice(0,20)}...`;
        
        return (
            <ConteinerLayout>
                <h2 className={s.title}>{title}</h2>
                <div className={s.container}>
                    <Zoom image = {image} alt={title}/>
                    {/* <img className={s.img} src={image} alt="title" /> */}
                    <div className={s.about}>
                        <div className={[s.info, !discount_price ? s.hide: ''].join(' ')}>
                            <div className={s.final_price}>{discount_price ? discount_price: price}$</div>
                            <div className={s.full_price}>{price}$</div>
                            <div className={s.discont}>{((price - discount_price) / price * 100).toFixed(1)}%</div>
                        </div>
                        <ButtonCust
                           onClick={handleOnCLick}
                           w={{sm: '100%', md: 340}}
                           h={85}
                           fz={28}
                           my={40}
                        >
                            To cart
                        </ButtonCust>
                        <div className={s.description}>
                            <h3 className={s.description_head}>Description</h3>
                            <div className={s.description_text}>{description}</div>
                        </div>
                    </div>
                </div>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    theme='dark'
                />
            </ConteinerLayout>
        )

    }
   
  }


  return render()
}
