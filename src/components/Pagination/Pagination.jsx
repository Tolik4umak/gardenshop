import React from 'react'
import s from './style.module.css'
import ButtonCust from '../../layouts/ButtonCust/ButtonCust'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronRight, faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function Pagination(
    {
        currentPage ,
        totalPages, 
        setCurrentPage, 
        loader,
        setLoader, 
        productsPerPage
    }
) {

  const pages = [... Array(totalPages)].map((_, i) => i+1)

  const onCLickHandler = (e) => {
    setCurrentPage(+e.target.innerText)
    setLoader(productsPerPage)
  }
  const pageUp = () => {
    currentPage < totalPages && setCurrentPage(currentPage + 1)
    setLoader(productsPerPage)
  }
  const pageDown = () => {
    currentPage > 1 && setCurrentPage(currentPage - 1)
    setLoader(productsPerPage)
  }

  return (
   <>
        <div className={s.container}>
            <FontAwesomeIcon 
                className={[s.arrow ,currentPage === 1? s.hidden : ''].join(' ')} 
                icon={faCircleChevronLeft} 
                onClick={pageDown}
            />

            {   totalPages<=8 
                && 
                pages.map(page => (
                    <p  
                        key={page}
                        className={[s.page, currentPage === page? s.active: ''].join(' ')}
                        onClick={onCLickHandler}
                    >
                        {page}
                    </p>
                ))
            }
            {
                totalPages>8 
                && 
                <>
                    {
                        pages.slice(0,2).map(page => (
                        <p  key={page}
                            className={[s.page, currentPage === page? s.active: ''].join(' ')}
                            onClick={onCLickHandler}
                        >
                            {page}
                        </p>
                        ))
                    }...
                    {
                        // currentPage>1
                        // &&
                        <div style={{display: 'flex', gap: '15px'}}>
                            { 
                                pages.slice(currentPage <= 3
                                    ? 2 : currentPage+2>=totalPages? totalPages-5 : currentPage-2 , 
                                    currentPage <= 3? 5: currentPage+2>=totalPages? totalPages-2 : currentPage+1)
                                    .map(page => (
                                        <p
                                            key={page} 
                                            className={[s.page, currentPage === page? s.active: ''].join(' ')}
                                            onClick={onCLickHandler}
                                        >
                                            {page}
                                        </p>
                                    ))
                                    
                            }...
                        </div>
                    }
                    {
                        pages.slice(pages.length-2, pages.length).map(page => (
                        <p
                            key={page}
                            className={[s.page, currentPage === page? s.active: ''].join(' ')}
                            onClick={onCLickHandler}
                        >
                            {page}
                        </p>
                        ))
                    }
                </>
            }

            <FontAwesomeIcon 
                className={[s.arrow ,currentPage === totalPages? s.hidden : ''].join(' ')} 
                icon={faCircleChevronRight}
                onClick={pageUp} 
            />
        </div>
        {   
            currentPage !== totalPages
            &&
            <ButtonCust
                onClick={() => {
                    setCurrentPage(currentPage + 1)
                    setLoader(productsPerPage + loader)
                }}
                w={120}
                h={35}
                background={'#fff'}
                color={'#339933'}
                border={'#339933'}
                hover
                >
                Load more
            </ButtonCust>
        }
   </>
    
  )
}
