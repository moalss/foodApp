import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'

export default function MaserLayout({loginData}) {
  return (
    <div className='container'>
    <div className='row'>
    <div className='col-md-3'>
    <div>
    <Sidebar></Sidebar>
    </div>
    </div>
    <div className='col-md-6'>
    <div>
    <Navbar loginData={loginData}></Navbar>
    <Header></Header>
    <Outlet></Outlet>
    </div>

    </div>
    
    
    </div>
    
    </div>
  )
}
