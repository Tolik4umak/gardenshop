import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ConteinerLayout from '../../layouts/ConteinerLayout/ConteinerLayout'
import s from './style.module.css'


export default function ProductSinglePage() {

  const {id} = useParams() 
  const {product, status, error} = useSelector(state => {
    const {list, ...rest} = state.products
    return{
        ...rest,
        product: list.find(item => +item.id === +id)
    }
  })

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
    
    if(status === 'resolve'){

        if(!product){
            return (
                <ConteinerLayout>
                    <div>{'Product not found'}</div>
                </ConteinerLayout>                
              )
        }else{
            const {id, image, price, discont_price , title, description } = product
            console.log(product);

            return (
                <ConteinerLayout>
                    <h2 className={s.title}>{title}</h2>
                    <div className={s.container}>
                        <img className={s.img} src={image} alt="title" />
                        <div className={s.about}>
                            <div className={[s.info, !discont_price ? s.hide: ''].join(' ')}>
                                <div className={s.final_price}>{discont_price ? discont_price: price}$</div>
                                <div className={s.full_price}>{price}$</div>
                                <div className={s.discont}>{((price - discont_price) / price * 100).toFixed(1)}%</div>
                            </div>
                            <button className={s.basket_button}> To card</button>
                            <div className={s.description}>
                                <h3 className={s.description_head}>Description</h3>
                                <div className={s.description_text}>{description}</div>
                            </div>
                        </div>
                    </div>
                </ConteinerLayout>
              )
        }
        
    }
   
  }


  return render()
}
