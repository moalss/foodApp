import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import logo from "../../../../assets/images/4 3.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
export default function ForgetPass() {
  let navigate=useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let onSubmit = async(data) => {
      try {
        let response= await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",data);
            // toast.success(response.data.message);
          navigate("/resetpass")

      } catch (error) {
        toast.error(error.response.data.message)
      }

  };

  return (
    <>
    <ToastContainer />
    <div className="auth-container">
    <div className="container-fluid bg-layout vh-100">
    <div className="row vh-100 justify-content-center align-items-center">
    <div className="col-md-6 bg-white border border-1 rounded">
    <div className="form-content w-75 m-auto">
    <div className="text-center my-2">
    <img src={logo} className="logo" alt="logo"></img>
    </div>
    <div>
    <h4>Forgot Your Password?</h4>
    <p className="text-muted ">
    No worries! Please enter your email and we will send a
    password reset link
    </p>
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="input-group mb-3">
    <span className="input-group-text" id="basic-addon1">
    <i className="fa fa-envelope"></i>
    </span>
    <input
    type="text"
    className="form-control"
    placeholder="Enter your E-mail"
    {...register("email", {
      required: "Email is required",
      pattern:{
        value:/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
        message:"Invalid Mail"
                      }
                    })}
                    />
                    </div>
                    {errors.email && <p className="alert alert-danger"> {errors.email.message}</p>}
                    <button className="btn btn-success w-100 my-3">submit</button>
                    </form>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </>
                    );
                  }
                  