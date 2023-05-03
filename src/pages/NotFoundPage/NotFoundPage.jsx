import React from 'react'
import BannerLayout from '../../layouts/BannerLayout/BannerLayout'
import ConteinerLayout from '../../layouts/ConteinerLayout/ConteinerLayout'
import bannerImg from '../../images/NotFoundBanner.png'


export default function NotFoundPage() {
  return (
    <ConteinerLayout>
        <BannerLayout bannerImg={bannerImg} aspectRatio={'1440/625 '}/>
    </ConteinerLayout>
  )
}
