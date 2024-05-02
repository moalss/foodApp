import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FillRecipes from "../../../SharedModule/components/FillRecipes/FillRecipes";

export default function RecipeData() {
  let [categoriesList, setCategoriesList] = useState([]);
  let [tagsList, setTagsList] = useState([]);
  const navigate = useNavigate();
  const goToRecipes = () => {
    navigate("/dashboard/recipes");
  };
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let getCategoriesList = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCategoriesList(response?.data?.data);
     
    } catch (error) {}
  };

  let appendToFormData = (data) => {
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("price", data.price);

    formdata.append("description", data.description);
    formdata.append("tagId", data.tagId);

    formdata.append("categoriesIds", data.categoriesIds);

    formdata.append("recipeImage", data.recipeImage[0]);

    return formdata;
  };
  let getTagsList = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/tag",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTagsList(response?.data);
    } catch (error) {}
  };

  let onSubmit = async (data) => {
    let appendToFormdata = appendToFormData(data);
    
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Recipe",
        appendToFormdata,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(response?.data?.message);
    
      goToRecipes();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoriesList();
    getTagsList();
  }, []);
  return (
    <>
      <FillRecipes></FillRecipes>
      <div className=" p-5 d-flex justify-content-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-50">
          
            <div className="input-group mb-1  ">
              <input
                type="text"
                className="form-control "
                placeholder="Enter your Name"
                {...register("name", {
                  required: "name is required",
                })}
              />
            </div>
            {errors.name && (
              <p className="alert alert-danger p-1"> {errors.name.message}</p>
            )}
            <div className="input-group mb-1  ">
              <select
                className="form-control"
                {...register("tagId", {
                  required: "Tag is required",
                })}
              >
                <option value="">select Tag</option>
                {tagsList?.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.tagId && (
              <p className="alert alert-danger p-1"> {errors.tagId.message}</p>
            )}
            <div className="input-group mb-1  ">
              <input
                type={"number"}
                className="form-control "
                placeholder="Enter your Price"
                {...register("price", {
                  required: "Price is requerd",
                })}
              />
              <span className="input-group-text" id="basic-addon2">
                EGP
              </span>
            </div>
            {errors.price && (
              <p className="alert alert-danger p-1"> {errors.price.message}</p>
            )}
            <div className="input-group mb-2  ">
              <select
                className="form-control"
                {...register("categoriesIds", {
                  required: "Category is requierd",
                })}
              >
                <option value="">select Category</option>
                {categoriesList?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.categoriesIds && (
              <p className="alert alert-danger p-1">
                {errors.categoriesIds.message}
              </p>
            )}
            <div className="input-group mb-1  ">
              <textarea
                className="form-control "
                placeholder="Enter your description"
                {...register("description", {
                  required: "description is requerd",
                })}
              />
            </div>
            {errors.description && (
              <p className="alert alert-danger p-1 ">
                {" "}
                {errors.description.message}
              </p>
            )}
            <div className="input-group mb-1  ">
              <input
                type="file"
                className="form-control "
                {...register("recipeImage", {
                  required: "Recipe Image is requerd",
                })}
              />
            </div>
            {errors.recipeImage && (
              <p className="alert alert-danger p-1">
                {" "}
                {errors.recipeImage.message}
              </p>
            )}

            <div className="text-end">
              <button
                className="btn border border-success text-success mx-2 p-1  my-3"
                onClick={goToRecipes}
              >
                Cansel
              </button>
              <button className="btn bg-success  p-1 text-white my-3">
                Save
              </button>
            </div>
          
        </form>
      </div>
    </>
  );
}
