import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

export default function RootLayout() {
  return (
    <div>
        <Header/>
        <div className='min-h-96'>
        <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}
