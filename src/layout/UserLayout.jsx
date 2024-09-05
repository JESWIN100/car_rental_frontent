import React from 'react'
import UserHeader from '../components/user/UserHeader'
import { Outlet } from 'react-router-dom'
import UserFooter from '../components/user/UserFooter';


export default function UserLayout() {
  return (
    <div>
        <UserHeader/>
        <div className='min-h-96'>
        <Outlet/>
        </div>
        <UserFooter/>
    </div>
  )
}
