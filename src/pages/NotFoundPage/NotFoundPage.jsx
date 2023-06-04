import React from 'react'
import ConteinerLayout from '../../layouts/ConteinerLayout/ConteinerLayout'
import Banner404 from '../../components/Banner404/Banner404'


export default function NotFoundPage() {
  document.title = 'Not Found 404';
  return (
    <ConteinerLayout>
        <Banner404/>
    </ConteinerLayout>
  )
}
