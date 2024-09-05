import React from 'react'
import { Outlet } from 'react-router-dom'

export default function LoginLayout() {
  return (
    <div>
         <div className='min-h-96'>
        <Outlet/>
        </div>
       
    </div>
  )
}
