import React from 'react'
import s from './style.module.css'
import instagram from '../../images/instagram.png'
import whatsapp from '../../images/WhatsApp.png'

export default function Footer() {
  return (
    <footer className={s.footer}>

      <section className={s.container}>
        
        <div className={s.contact}>
            <p className={s.title}>Contact</p>
            <p className={s.tel}>+4915735996746</p>
            <div className={s.social}>
              <a
                className={s.social_item} 
                href="https://www.instagram.com/telran.de/" 
                target='_blank'
              >
                <img src={instagram} alt="" />
                <p>instagram</p>                   
              </a>
              <a
                className={s.social_item} 
                href="tel: +4915735996746" 
              >
                <img src={whatsapp} alt="" />
                <p>WhatsApp</p>                   
              </a>
            </div>
        </div>

        <div className={s.address}>
          <p className={s.title}>Address</p>
          <a 
            className={s.link}
            href="https://goo.gl/maps/sUF9dkRAxNWT27Ec9" 
            target='_blank'
          >
            Linkstraße 2/8 Etage, 10785 Berlin
          </a>
          <div className={s.schedule}>
            <p>Worhing hours:</p>
            <p>24 hours day</p>
          </div>
        </div>

      </section>

      <iframe 
        className={s.googlemaps}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.4090427798847!2d13.372469777315375!3d52.5079361371218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a8515353a68755%3A0xd0866511db4f838f!2sTel-Ran.de%20GmbH!5e0!3m2!1sru!2sde!4v1685384241573!5m2!1sru!2sde" 
        allowfullscreen={true}
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade"
      >   
      </iframe>
    </footer>
  )
}
