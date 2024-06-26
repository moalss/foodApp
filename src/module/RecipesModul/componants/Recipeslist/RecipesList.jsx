import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";

import avatar from "../../../../assets/images/header.png";
import { AuthContext } from "../../../../context/AuthContext/AuthContext";
import { ToasterContext } from "../../../../context/ToasterContext/ToasterContext";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import Header from "../../../SharedModule/components/Header/Header";
import NoData from "../../../SharedModule/components/NoData/NoData";

export default function RecipesList() {
  let {requestHeader ,baseUrl}= useContext(AuthContext);
  let {getToasterValue}= useContext(ToasterContext);


  const navigate = useNavigate();

  const [showId, setShowId] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [name, setName] = useState("");
  const [tagId, setTagId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
 
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [recipesList, setRecipesList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState([]);

  const getNameValue = (data) => {
    setName(data.target.value);
    getRecipesList(data.target.value, tagId, categoryId, pageNumber);
  };
  const getTagIdValue = (data) => {
    setTagId(data.target.value);
    getRecipesList(name, data.target.value, categoryId, pageNumber);
  };
  const getCategoryIdValue = (data) => {
    setCategoryId(data.target.value);
    getRecipesList(name, tagId, data.target.value, pageNumber);
  };
 

  const goToAddRecipe = () => {
    navigate("/dashboard/recipedata");
  };

  const handleDetailsshow = (showId) => {
   
    getRecipeDetails(showId)
    setShowDetails(true);
    
  };
  const handleDetailsClose = () => setShowDetails(false);

  const handleDeleteshow = (showId) => {
    setShowId(showId);
    setShowDelete(true);
  };
  const handleDeleteClose = () => setShowDelete(false);


  let getRecipeDetails = async (id) => {
    try {
     const response= await axios.get(
        `${baseUrl}Recipe/${id}`,
        {
          headers: requestHeader,
        }
      );
      setRecipeDetails(response)
    
    } catch (error) {
      console.log(error);
    }
  };

  let deleteRecipesList = async () => {
    try {
      await axios.delete(
        `${baseUrl}Recipe/${showId}`,
        {
          headers: requestHeader,
        }
      );
      getToasterValue("success","Recipes is deleted");
      getRecipesList("", "", "", pageNumber);
      handleDeleteClose();
    } catch (error) {
      console.log(error);
    }
  };

  
  let addFavorite= async(id)=>{
    try {
      let response = await axios.post(
        `${baseUrl}userRecipe/`,{"recipeId": id},
        
        {
          headers: requestHeader,

          
        }
      );
       getToasterValue("success","added to Favorite") 
      handleDetailsClose()
    } catch (error) {
      console.log(error);
    }
  }
  
  let getTagsList = async () => {
    try {
      let response = await axios.get(
        `${baseUrl}tag`,
        {
          headers: requestHeader,
        }
      );
      setTagsList(response?.data);
    } catch (error) {}
  };
  let getCategoriesList = async () => {
    try {
      let response = await axios.get(
        `${baseUrl}Category`,
        {
          headers: requestHeader,
        }
      );
      setCategoriesList(response?.data?.data);
    } catch (error) {}
  };

  let getRecipesList = async (name, tagId, categoryId, pageNum) => {
    try {
      let response = await axios.get(
        `${baseUrl}Recipe/?pageSize=7&pageNumber=` +
          pageNum,
        {
          headers: requestHeader,
          params: {
            name: name,
            tagId: tagId,
            categoryId: categoryId,
          },
        }
      );
      setRecipesList(response?.data?.data);
      setTotalNumberOfPages(
        Array(response?.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecipesList("", "", "", pageNumber);
    getCategoriesList();
    getTagsList();
    
  }, []);
  return (
    <>
      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteData item="Recipe" deleteList={deleteRecipesList}></DeleteData>
        </Modal.Body>
      </Modal>

      <Modal show={showDetails} onHide={handleDetailsClose}>
        <Modal.Header closeButton>
          <Modal.Title>Recipe Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="w-75 text-center">
            <img className="img-fluid" src={
              "https://upskilling-egypt.com:3006/" + recipeDetails?.data?.imagePath
            } alt="Recipes Image"></img>
            </div>

            <div>
            <p> {recipeDetails?.data?.description}</p>
            </div>
            <button className="btn btn-success" onClick={()=>addFavorite(recipeDetails?.data?.id)}>add to Favorite</button>
          </div>
        </Modal.Body>
      </Modal>

      <Header
        title={"Recipes"}
        title2={"Items"}
        image={avatar}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      ></Header>
      <div className="container-fluid">
        <div className="row px-3">
          <div className="col-md-6 ">
            <h4> Recipes Table Details</h4>
            <span>You can check all details</span>
          </div>
          <div className="col-md-6 d-flex justify-content-end  my-3">
            <button className="btn btn-success" onClick={goToAddRecipe}>
              Add New Recipes{" "}
            </button>
          </div>
          <div className="row ">
            <div className="col-md-6 ">
              <div className="input-group mb-1  ">
                <input
                  type="text"
                  className="form-control "
                  placeholder="Search here with Name"
                  onChange={getNameValue}
                />
              </div>
            </div>
           
            <div className="col-md-3">
              <select className="form-control " onChange={getTagIdValue}>
                <option value="" selected>
                  {" "}
                  Tag
                </option>
                {tagsList.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {" "}
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-control " onChange={getCategoryIdValue}>
                <option value="" selected>
                  {" "}
                  Category
                </option>
                {categoriesList.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {" "}
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {recipesList.length > 0 ? (
            <>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Tag</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recipesList.map((elem) => (
                    <tr key={elem.id}>
                      <td>{elem.name}</td>
                      <td>
                        {elem.imagePath ? (
                          <img
                            className="imgRecipes "
                            src={
                              "https://upskilling-egypt.com:3006/" +
                              elem?.imagePath
                            }
                            alt="recipe Image"
                          ></img>
                        ) : (
                          ""
                        )}
                      </td>
                      <td>{elem.price}</td>
                      <td>{elem.description}</td>
                      <td>{elem.category[0]?.name}</td>
                      <td>{elem.tag?.name}</td>
                      <td>
                        {
                          <Dropdown as={ButtonGroup} className="w-25">
                            <Dropdown.Toggle
                              variant="success"
                              id="dropdown-split-basic"
                            />
                            <Dropdown.Menu>
                              <div className="d-flex">
                                <button
                                  className="btn btn-danger mx-1"
                                  onClick={() => handleDeleteshow(elem.id)}
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                                <button className="btn btn-warning  mx-1">
                                  <i className="fa-solid fa-edit"></i>
                                </button>
                                <button className="btn btn-success  mx-1" onClick={()=>handleDetailsshow(elem.id)}>
                          <i className="fa-solid fa-eye" ></i>
                          </button>
                              </div>
                            </Dropdown.Menu>
                          </Dropdown>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            <NoData />
          )}
          <nav aria-label="Page navigation ">
            <ul className="pagination">
              <li className="page-item">
                <Link disabled={pageNumber === 0?true:false}
                  className="page-link"
                  aria-label="Previous"
                  onClick={() => {
                    pageNumber > 0
                      ? setPageNumber(pageNumber - 1)
                      : setPageNumber(0);
                    getRecipesList(name, tagId, categoryId, pageNumber);
                  }}
                >
                  <span aria-hidden="true">&laquo;</span>
                </Link>
              </li>
              {totalNumberOfPages.slice(0,10).map((pageNum) => (
                <li
                  key={pageNum}
                  className="page-item"
                  onClick={() => {
                    getRecipesList(name, tagId, categoryId, pageNum);
                    setPageNumber(pageNum);
                  }}
                >
                  <Link className="page-link">{pageNum}</Link>
                </li>
              ))}

              <li className="page-item  "  >
                <Link disabled={pageNumber>totalNumberOfPages.length?true:false}
                  className="page-link"
                  aria-label="Next"
                  onClick={() => {
                    pageNumber < totalNumberOfPages.length
                      ? setPageNumber(pageNumber + 1)
                      : setPageNumber(pageNumber);
                    getRecipesList(name, tagId, categoryId, pageNumber);
                  }}
                >
                  <span aria-hidden="true" >&raquo;</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
