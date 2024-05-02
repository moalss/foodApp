import axios from "axios";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../../assets/images/4 3.png";

export default function Register() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  let navigate = useNavigate();
  const {
    register,watch,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const appendToFormData=(data)=>{
    const formdata= new FormData();
formdata.append("userName",data.userName )
formdata.append("email",data.email  )
formdata.append("country",data.country  )
formdata.append("phoneNumber",data.phoneNumber  )
formdata.append("password",data.password  )
formdata.append("confirmPassword",data.confirmPassword  )
formdata.append("profileImage",data.profileImage[0]  )
return formdata;

  }
  const onSubmit = async (data) => {
        try {
      let response=  await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Register",appendToFormData(data));
      
     
      toast.success(response.data.message);
      navigate("/verifyaccount")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  return (
    <div className="container-fluid bg-layout">
      <div className="row vh-100 justify-content-center align-items-center ">
        <div className="col-md-6 bg-white rounded ">
          <div className="text-center">
            <img src={logo} alt="logo"></img>
          </div>
          <div className="form-content m-auto w-75 ">
            <h3>Register</h3>
            <p>Welcome Back! Please enter your details</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-6">

                  <div className="input-group mb-3  ">
                    <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-user"></i>
                    </span>

                    <input
                      type="text"
                      className="form-control  "
                      placeholder="Enter your UserName"
                      {...register("userName", {
                        required: "User Name is requerd",
                      })}
                    />
                    </div>
                    {errors.userName && (
                      <p className="alert alert-danger">
                        {" "}
                        {errors.userName.message}
                      </p>
                    )}
                  

                  </div>
                  
                

                  <div className="col-md-6 ">
                    <div className="input-group mb-3  ">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-envelope"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control "
                        placeholder="Enter your E-mail"
                        {...register("email", {
                          required: "Email is requierd",
                          pattern: {
                            value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                            message: "Invalid Mail",
                          },
                        })}
                      />
                    </div>
                    {errors.email && (
                      <p className="alert alert-danger">
                        {" "}
                        {errors.email.message}
                      </p>
                    )}
                  </div>
               
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group mb-3  ">
                      <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-earth-asia"></i>
                      </span>

                      <input
                        type="text"
                        className="form-control  "
                        placeholder="Enter your country"
                        {...register("country", {
                          required: "country is required",
                        })}
                      />

                     
                    </div>
                    {errors.country && (
                      <p className="alert alert-danger">
                        {" "}
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                  <div className="col-md-6 ">
                    <div className="input-group mb-3  ">
                      <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-phone"></i>
                      </span>
                      <input
                        type="number"
                        className="form-control "
                        placeholder="Enter your PhoneNumber"
                        {...register("phoneNumber", {
                          required: "PhoneNumber is requierd",
                         
                        })}
                      />
                    </div>
                    {errors.PhoneNumber && (
                      <p className="alert alert-danger">
                        {" "}
                        {errors.PhoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="row">
                
                <div className="col-md-6">
                <div className="input-group mb-3  ">
                <span className="input-group-text" id="basic-addon1"><i className="fa fa-key"></i></span>
                
                <input type={passwordShown ? "text" : "password"} className="form-control  " placeholder="Enter your password"  {...register("password",{
                  required:"Password is requerd"
                })}/>
                
                <i className="fa-solid fa-eye position-absolute " onClick={togglePasswordVisiblity}></i>
                </div>
               {errors.password&&<p className="alert alert-danger"> {errors.password.message}</p>}
                </div>

                <div className="col-md-6">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1"><i className="fa fa-key"></i></span>
                  <input type={passwordShown?"text":"password"} className="form-control " placeholder=" Confirm New Password"  {...register("confirmPassword",{
                    required:("confoirm password is required"),
                    validate:(value)=>value===watch("password")|| "password do not match"
                  })}/>
                  <i className="fa-solid fa-eye position-absolute " onClick={togglePasswordVisiblity}></i>
                  </div>
                  
                 {errors.confirmPassword&&<p className="alert alert-danger my-1 "> {errors.confirmPassword.message}</p>}
                </div>
                

               </div>
               <div className="input-group mb-3">
                  
                  <input type="file" className="form-control "  {...register("profileImage")}/>
                  
                  </div>
               <div className="text-end">
               <Link to="/login"  className="text-success text-decoration-none">Login Now?</Link>
               </div>
               <div className="text-center">
               
               <button className="btn bg-success w-75 p-1 text-white my-3">
               Register
             </button>
               </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
