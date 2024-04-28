import React from "react";

export default function Header({ title, title2, description, image }) {
  return (
    <>
      <div className="container-fluid m-2 px-3 headerBackground ">
        <div className="row  align-items-center text-white">
          <div className="col-md-8 ">
            <div className="content px-5">
              <h2 className="fw-bold d-inline">{title} </h2> <h2 className=" d-inline">{title2} </h2>
              <p>{description}</p>
            </div>
          </div>
          <div className="col-md-4 text-center ">
            <div className="image ">
              <img src={image} className="w-50" alt></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
