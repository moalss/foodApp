import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import SideBar from '../Sidebar/SideBar'
import home_avatar from "../../../../assets/images/home-avatar.svg"

export default function MaserLayout({loginData}) {
  return (

    <div className='d-flex   '>
    <div className='vh-100'>
     <SideBar ></SideBar>
     </div>
    <div className='w-100'>
    <Navbar loginData={loginData}></Navbar>
    
    <Outlet></Outlet>
    </div>
    
    
    </div>
    
    
  )
}
