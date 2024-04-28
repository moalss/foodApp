import React from 'react'
import avatar from "../../../../assets/images/avatar.png"
export default function Navbar({loginData}) {

  return (
   <>
   <nav className="navbar navbar-expand-lg rounded-2 navbar-light bg-light ">
  <div className="container-fluid  ">
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarNavDropdown">
      <ul className="navbar-nav ms-auto ">
      <li className="nav-item nav-link">
             <div className='user-image  '>
             <img src={avatar} alt="user-image" className='img-fluid rounded-5'></img>
             </div> 
        </li>
        <li className="nav-item nav-link">
          <span className="fw-bold">{loginData?.userName}</span>
         
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li className="nav-item nav-link">
        <i class="fa-solid fa-bell"></i>
       
      </li>
      </ul>
    </div>
  </div>
</nav>
   </>
  )
}
