import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../../../assets/images/4 3.png";
export default function VerifyAccount() {

 
    let navigate=useNavigate();
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const onSubmit=  async (data) =>{
        
        try {
          let response=  await axios.put("https://upskilling-egypt.com:3006/api/v1/Users/verify",data);
                  
          toast.success(response.data.message);
          navigate("/login")
        } catch (error) {
          
          toast.error(error.response.data.message)
        }
      } 

  return (
    <div className="auth-container ">
      <div className="container-fluid bg-layout   ">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-6 bg-white border border-1 rounded">
            
              <div className="text-center">
                <img src={logo} alt="logo" className="logo py-2"></img>
              </div>
              <div className="form-content w-75 m-auto my-3 ">
              <div>
              <h3>Verify your Account</h3>
              <p className="text-muted">
              Welcome Back! Please enter your details
              </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                 
                  <div className="input-group mb-3  ">
                  <span className="input-group-text" id="basic-addon1"><i className="fa fa-envelope"></i></span>
                  <input type="email" className="form-control " placeholder="Enter your E-mail" {...register("email",{
                    required:"Email is requierd",
                    pattern:{
                      value:/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                      message:"Invalid Mail"
                    }
                  })} />
                  </div>
                  {errors.email&&<p className="alert alert-danger"> {errors.email.message}</p>}
                  <div className="input-group mb-3  ">
                  <span className="input-group-text" id="basic-addon1"><i className="fa fa-key"></i></span>
                  
                  <input type="text" className="form-control  " placeholder="Enter your code"  {...register("code",{
                    required:"code is required"
                  })}/>
                  
                  
                  </div>
                 {errors.code&&<p className="alert alert-danger"> {errors.code.message}</p>}

                 
                  <button className="btn bg-success w-100 p-1 text-white my-3">Verify</button>
                  
                  </form>
                </div>
           
          </div>
        </div>
      </div>
    </div>
  )
}
