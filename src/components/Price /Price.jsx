import React from 'react'
import s from './style.module.css'

export default function Price({discont_price, price, fontSizes}) {

  const [final_price, full_price, discont] = fontSizes ?? ''
  
  return (
    <div className={[s.info, discont_price ? s.hide: ''].join(' ')}>
        <div style={{'fontSize': final_price}} className={s.final_price}>{discont_price ? discont_price: price}$</div>
        <div style={{'fontSize': full_price}} className={s.full_price}>{price}$</div>
        <div style={{'fontSize': discont}} className={s.discont}>{price}%</div>
    </div>
  )
  
}
