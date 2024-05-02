import React from 'react'
import avatar from "../../../../assets/images/header.png"
import Header from '../../../SharedModule/components/Header/Header'
import logo from "../../../../assets/images/4 3.png";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
export default function ChangPass() {
  const [values, setValues] = useState(false);
  const handleClickShowPassword = (fieldName) => {
    setValues({
      ...values,
      showPassword: fieldName === values.showPassword ? "" : fieldName,
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    
    try {
      let response = await axios.put(
        "https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword",
        data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(response.data.message, { autoClose: 500 });
      handleClose();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
       <div className="container ">
            <div className="row  ">
              <div className="col-md-12  ">
                <div className="text-center ">
                  <img src={logo} alt="logo"></img>
                </div>

                <div className="form-content  ">
                  <h2>Change Your Password</h2>
                  <p className="text-muted">Enter your details below</p>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group mb-3  ">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-key"></i>
                      </span>

                      <input
                        type={
                          values.showPassword === "currentPassword"
                            ? "text"
                            : "password"
                        }
                        className="form-control  "
                        placeholder="Enter your old password"
                        {...register("oldPassword", {
                          required: "old Password is requerd",
                        })}
                      />

                      <i
                        className="fa-solid fa-eye position-absolute "
                        onClick={() =>
                          handleClickShowPassword("currentPassword")
                        }
                      ></i>
                    </div>
                    {errors.oldPassword && (
                      <p className="alert alert-danger">
                        {" "}
                        {errors.oldPassword.message}
                      </p>
                    )}
                    <div className="input-group mb-3  ">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-key"></i>
                      </span>

                      <input
                        type={
                          values.showPassword === "newPassword"
                            ? "text"
                            : "password"
                        }
                        className="form-control  "
                        placeholder="Enter your New password"
                        {...register("newPassword", {
                          required: "New Password is requerd",
                        })}
                      />

                      <i
                        className="fa-solid fa-eye position-absolute "
                        onClick={() => handleClickShowPassword("newPassword")}
                      ></i>
                    </div>
                    {errors.newPassword && (
                      <p className="alert alert-danger">
                        {" "}
                        {errors.newPassword.message}
                      </p>
                    )}

                    <div className="input-group mb-3  ">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-key"></i>
                      </span>

                      <input
                        type={
                          values.showPassword === "confirmPassword"
                            ? "text"
                            : "password"
                        }
                        className="form-control  "
                        placeholder="Enter your confirm password"
                        {...register("confirmNewPassword", {
                          required: "confirm Password is requerd",
                        })}
                      />

                      <i
                        className="fa-solid fa-eye position-absolute "
                        onClick={() =>
                          handleClickShowPassword("confirmPassword")
                        }
                      ></i>
                    </div>
                    {errors.confirmNewPassword && (
                      <p className="alert alert-danger">
                        {" "}
                        {errors.confirmNewPassword.message}
                      </p>
                    )}
                    <button className="btn btn-success w-100">
                      {" "}
                      Change Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}
