import React from "react";
import { useNavigate } from "react-router-dom";

export default function FillRecipes() {
  const navigate = useNavigate();
  const gotoRecipes = () => {
    navigate("/dashboard/recipes");
  };

  return (
    <div className="p-4">
      <div className="container-fluid bg-fillRecipes">
        <div className="row p-2">
          <div className="col-md-6  ">
            <h2>
              Fill the <span className="text-success">Recipes </span>!{" "}
            </h2>
            <p>
              you can now fill the meals easily using the table and form , click
              here and sill it with the table !
            </p>
          </div>

          <div className="col-md-6 text-end ">
            <button onClick={gotoRecipes} className="btn btn-success">
              {" "}
              All Recipes <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>

        
      </div>
    </div>
  );
}
