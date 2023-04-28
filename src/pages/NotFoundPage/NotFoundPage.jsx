import React from 'react'
import BannerLayout from '../../layouts/BannerLayout/BannerLayout'
import ConteinerLayout from '../../layouts/ConteinerLayout/ConteinerLayout'


export default function NotFoundPage() {
  return (
    <ConteinerLayout>
        <BannerLayout link={"./images/NotFoundBanner.png"} size={'1440/625 '}/>
    </ConteinerLayout>
  )
}
