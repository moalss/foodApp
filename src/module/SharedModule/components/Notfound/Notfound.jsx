import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/images/4 3.png";
export default function Notfound() {
const navigate =useNavigate()
  let backToHome=()=>{
    navigate("/login")
  }
  return (
    <div className="notfoundimg">
      <div className="container-fluid  ">
      <div className="row mx-4 vh-100 ">
      <div><img src={logo}></img></div>
          <div className="col-md-6 align-items-center">
            <div className="notfound-content ">
              <h2 className="fw-bold">Oops.</h2>
              <span>
              <h2 className="text-success "><span className="dots position-relative">Page </span> not found </h2>
             
              </span>
              <p >
                This Page doesn’t exist or was removed! We suggest you back to
                home.
              </p>
              <div className="text-center">
              <button className="btn btn-success py-3 w-25 " onClick={backToHome}><i className="fa-solid fa-arrow-left"></i> Back to Home</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
