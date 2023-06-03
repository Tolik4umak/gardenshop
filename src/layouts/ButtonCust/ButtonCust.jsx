import React, { useEffect, useRef, useState } from 'react'
import s from './style.module.css'
import useResize from '../../hooks/useResize'

export default function ButtonCust(props) {


  const {
    className,
    onClick,
    w,h,fz,fw,
    m,mx,my,mt,mr,mb,ml,
    p,px,py,pt,pr,pb,pl,
    action,
    color, 
    background,
    hover,
    children,
    border, 
    custStyle,
    borderRadius, 
  } = props

  const button = useRef()  
  const screen =useResize()

  const getValue = (val) => {
    const sm = Boolean(screen <= 768) && (val?.sm || val) 
    const md = Boolean(screen> 768 && screen <=960) && (val?.md || val?.sm || val) 
    const lg = Boolean(screen > 960) && (val?.lg || val?.md || val?.sm || val) 
    return sm || md || lg
  }

  useEffect(() => {
    if(action === undefined || action){
        button.current.classList.add(s.btn_press)
    }

    button.current.style.border = `2px solid ${custStyle?.border || border || background || '#339933'}`
   
    if(!custStyle?.margin)  button.current.style.margin = `${m}px`
    if(!custStyle?.marginTop ){
        button.current.style.marginTop = `${my}px`
        button.current.style.marginTop = `${mt}px`
    } 
    if(!custStyle?.marginBottom ){
        button.current.style.marginBottom = `${my}px`
        button.current.style.marginBottom = `${mb}px`
    }
    if(!custStyle?.marginLeft ){
        button.current.style.marginLeft = `${mx}px`
        button.current.style.marginLeft = `${ml}px`
    }  
    if(!custStyle?.marginRight){
        button.current.style.marginRight= `${mx}px`
        button.current.style.marginRight= `${mr}px`
    }     
    
    if(!custStyle?.padding) button.current.style.padding = `${p}px`
    if(!custStyle?.paddingTop ){
        button.current.style.paddingTop = `${py}px`
        button.current.style.paddingTop = `${pt}px`
    } 
    if(!custStyle?.paddingBottom ){
        button.current.style.paddingBottom = `${py}px`
        button.current.style.paddingBottom = `${pb}px`
    }
    if(!custStyle?.paddingLeft ){
        button.current.style.paddingLeft = `${px}px`
        button.current.style.paddingLeft = `${pl}px`
    }  
    if(!custStyle?.paddingRight){
        button.current.style.paddingRight= `${px}px`
        button.current.style.paddingRight= `${pr}px`
    } 

  }, [props])  


  const mouseOverHandl = () => {
    button.current.style.background =  custStyle?.color || color || '#fff'
    button.current.style.color = custStyle?.background || background || '#339933'
  }

  const mouseOutHandl = () => {
    button.current.style.background = custStyle?.background || background || '#339933'
    button.current.style.color = custStyle?.color || color || '#fff'
  } 

  return (
    <button
        onClick={onClick}
        ref={button}
        className={[s.btn, className].join(' ')} 
        style = {
            {
                width: getValue(w), 
                height: getValue(h), 
                color: getValue(color), 
                background: getValue(background), 
                borderRadius: getValue(borderRadius), 
                fontSize: getValue(fz), 
                fontWeight: getValue(fw), 
                border ,
                ...custStyle 
            }
        }
        onMouseOver={hover && mouseOverHandl}
        onMouseOut={hover && mouseOutHandl}
    >
        
        {children}
        
    </button >
  )
}
