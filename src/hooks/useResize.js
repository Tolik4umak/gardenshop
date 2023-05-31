import React, { useEffect, useState } from 'react'

export default function useResize() {
    const [size, setSize] = useState(window.innerWidth)

    useEffect(()=>{
        const handleWide = (event) => setSize(event.target.innerWidth)
        window.addEventListener('resize', handleWide)

        return () => {
            window.removeEventListener('resize', handleWide)
        }
    },[])

    return size
}
