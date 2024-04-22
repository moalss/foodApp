import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  let navigate=useNavigate();
  let logout=()=>{
    localStorage.removeItem("token");
    navigate("/login")
  }
  return (
    <div>
      <button className='btn btn-danger ' onClick={logout}> Logout</button>
    </div>
  )
}
