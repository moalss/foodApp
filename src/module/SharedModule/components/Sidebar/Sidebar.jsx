import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import logoToggel from "../../../../assets/images/3.png";


export default function SideBar() {

  let [show,setShow]=useState(null);

  let togellShow=()=>{
    setShow(!show)
  }

  let navigate=useNavigate();
  let logout=()=>{
    localStorage.removeItem("token");
    navigate("/login")
  }


  return (
    <>
   <div className='sidbar-container'>
   
   <Sidebar collapsed={show} className="vh-100">
   <Menu>
   
     <MenuItem className='m-2' icon={<img src={logoToggel} onClick={togellShow} alt="logoToggel" ></img>}> </MenuItem>
     <MenuItem  icon={<i class="fa-solid fa-house"></i>} component={<Link to="/dashboard" />}> Home </MenuItem>
     <MenuItem  icon={<i class="fa-solid fa-users"></i>} component={<Link to="/dashboard/user" />}> Users </MenuItem>
     <MenuItem  icon={<i class="fa-solid fa-table-columns"></i>} component={<Link to="/dashboard/recipes" />}> Recipes </MenuItem>
     <MenuItem  icon={<i class="fa-solid fa-table-cells"></i>} component={<Link to="/dashboard/categories" />}> Categories </MenuItem>
     <MenuItem  icon={<i class="fa-solid fa-unlock"></i>} component={<Link to="/changepass" />}> Change Password </MenuItem>
     <MenuItem  icon={<i class="fa-solid fa-right-from-bracket"></i>} onClick={logout}> Log Out </MenuItem>
     
     
   </Menu>
 </Sidebar>
   </div>
    </>
  )
}
