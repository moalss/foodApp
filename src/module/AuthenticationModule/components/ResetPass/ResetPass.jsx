import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../../../assets/images/4 3.png";

export default function ResetPass() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [ConfirmpasswordShown, setConfirmPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const ConfirmtogglePasswordVisiblity = () => {
    setConfirmPasswordShown(ConfirmpasswordShown ? false : true);
  };
const {register,handleSubmit,watch,formState:{errors}}=useForm();
const navigate=useNavigate();
const onSubmit= async(data)=>{
  try {
     await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset",data);
     toast.success("Password is new");
      navigate("/login");
  } catch (error) {
    toast.error(error.respose.data.message)
    
  }
}


  return (
   <>
  
   <div className='auth-container'>
    <div className='container-fluid bg-layout'>
    <div className='row min-vh-100 justify-content-center align-items-center '>
      <div className='col-md-6 bg-white border border-1 rounded '>
        <div className='form-content w-75 m-auto'>
          <div className='text-center'>
          <img src={logo} alt="logo" className='logo' ></img>
          
          </div>

          <div>
              <h3> Reset  Password</h3>
              <p className="text-muted">
              Please Enter Your Otp  or Check Your Inbox
              </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                  <div className="input-group mb-2  ">
                  <span className="input-group-text" id="basic-addon1"><i className="fa fa-envelope"></i></span>
                  <input type="text" className="form-control p-1" placeholder="Enter your E-mail" {...register("email",{
                    required:"Email is required",
                    pattern:{
                      value:/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                      message:"Invalid Mail"
                    }
                  }
                  )} />
                  </div>
                  {errors.email&&<p className="alert alert-danger  my-1 p-0"> {errors.email.message}</p>}
                  <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1"><i className="fa fa-key"></i></span>
                  <input type="password" className="form-control p-1" placeholder="OTP"  {...register("seed",{
                    required:"OTP is required"
                  })}/>
                  
                  </div>
                 {errors.seed&&<p className="alert alert-danger my-1 p-0"> {errors.seed.message}</p>}

                  <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1"><i className="fa fa-key"></i></span>
                  <input type={passwordShown?"text":"password"} className="form-control p-0" placeholder="New Password"  {...register("password",{
                    required:"Password is required"
                  })}/>
                  <i className="fa-solid fa-eye position-absolute " onClick={togglePasswordVisiblity}></i>
                  </div>
                 {errors.password&&<p className="alert alert-danger my-1 p-0"> {errors.password.message}</p>}
                  <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1"><i className="fa fa-key"></i></span>
                  <input type={ConfirmpasswordShown?"text":"password"} className="form-control p-1" placeholder=" Confirm New Password"  {...register("confirmPassword",{
                    required:("confoirm password is required"),
                    validate:(value)=>value===watch("password")|| "password do not match"
                  })}/>
                  <i className="fa-solid fa-eye position-absolute " onClick={ConfirmtogglePasswordVisiblity}></i>
                  </div>
                  
                 {errors.confirmPassword&&<p className="alert alert-danger my-1 p-0"> {errors.confirmPassword.message}</p>}
                  <button className="btn bg-success w-100 p-0 text-white mb-2">Reset Password</button>
                  </div>
              
              </form>
        
        </div>
      
      
      
      </div>
    
    
    </div>



    </div>

   </div>
   
   </>
  )
}
