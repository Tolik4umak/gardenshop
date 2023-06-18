import React, { useEffect, useRef, useState } from 'react'
import s from './style.module.css'
import useResize from '../../hooks/useResize'

export default function Zoom({image}) {


  const resize = useResize()  
  const loup = useRef()  
  const img = useRef()  

  const [size, setSize] = useState(0)
  
  useEffect(() => {
    setSize(img.current.clientWidth)
    loup.current.style.width = `${size/5}px`
    loup.current.style.height = `${size/5}px`
  }, [size, resize])

  const handleMove = ({nativeEvent}) => {



    const posX = nativeEvent.offsetX
    const posY = nativeEvent.offsetY
    const center = size/5/2
    if(resize <= 768){
        loup.current.style.display = 'none'
    }else{
        loup.current.style.display = 'block'
    }

    loup.current.style.backgroundSize = `${size*2}px`
    loup.current.style.left = `${posX - center}px`
    loup.current.style.top = `${posY - center}px`
    loup.current.style.backgroundImage = `url(${image})`
    loup.current.style.backgroundPosition = `${(-posX*2 + center)}px ${(-posY*2 + center)}px`
  }

  const handleOut = () => {
    loup.current.style.display = 'none'
  }

  return (
    <div className={s.wrap}>
        <img ref={img} onMouseOut={handleOut} onMouseMove={handleMove} className={s.img} src={image} alt="title" />
        <div ref={loup} className={s.loup}></div>
    </div>
   
  )
}
