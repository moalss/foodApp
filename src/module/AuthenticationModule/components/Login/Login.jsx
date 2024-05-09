import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";


import logo from "../../../../assets/images/4 3.png";
import { AuthContext } from "../../../../context/AuthContext/AuthContext";
import { ToasterContext } from "../../../../context/ToasterContext/ToasterContext";


export default function Login() {
 
  let {loginInfo ,baseUrl}= useContext(AuthContext);
  let {getToasterValue}= useContext(ToasterContext); 

const [passwordShown, setPasswordShown] = useState(false);
const togglePasswordVisiblity = () => {
  setPasswordShown(passwordShown ? false : true);
};

let navigate=useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit=  async (data) =>{
    
    try {
      let response=  await axios.post(`${baseUrl}Users/Login`,data);
     
      localStorage.setItem("token", response.data.token);
      
    
      loginInfo();
      getToasterValue("success","Login")
      navigate("/dashboard")
    } catch (error) {
      getToasterValue("error",error.response.data.message)
      
    }
  } 
  


  


  return (
    <>
    
    <div className="auth-container ">
      <div className="container-fluid bg-layout   ">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-6 bg-white border border-1 rounded">
            
              <div className="text-center">
                <img src={logo} alt="logo" className="logo py-2"></img>
              </div>
              <div className="form-content w-75 m-auto my-3 ">
              <div>
              <h3>Log In</h3>
              <p className="text-muted">
              Welcome Back! Please enter your details
              </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                  <div className="input-group mb-3  ">
                  <span className="input-group-text" id="basic-addon1"><i className="fa fa-envelope"></i></span>
                  <input type="text" className="form-control " placeholder="Enter your E-mail" {...register("email",{
                    required:"Email is required",
                    pattern:{
                      value:/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                      message:"Invalid Mail"
                    }
                  })} />
                  </div>
                  {errors.email&&<p className="alert alert-danger"> {errors.email.message}</p>}
                  <div className="input-group mb-3  ">
                  <span className="input-group-text" id="basic-addon1"><i className="fa fa-key"></i></span>
                  
                  <input type={passwordShown ? "text" : "password"} className="form-control  " placeholder="Enter your password"  {...register("password",{
                    required:"Password is required"
                  })}/>
                  
                  <i className="fa-solid fa-eye position-absolute " onClick={togglePasswordVisiblity}></i>
                  </div>
                 {errors.password&&<p className="alert alert-danger"> {errors.password.message}</p>}
                  <div className="d-flex justify-content-between"> 
                  <Link to={"/register"} className="text-black text-decoration-none">Register Now?</Link>
                  <Link to="/forgetpass"  className="text-success text-decoration-none">Forgot Password?</Link>
                  </div>
                  <button className="btn bg-success w-100 p-0 text-white my-3">Login</button>
                  </div>
                  </form>
                </div>
           
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
