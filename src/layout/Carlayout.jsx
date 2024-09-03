import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import CarHeader from '../components/user/CarHeader'

export default function CarLayout() {
  return (
    <div>
        <CarHeader/>
        <div className='min-h-96'>
        <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}
