import axios from "axios";
import React, { useEffect, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import { useForm } from "react-hook-form";
import avatar from "../../../../assets/images/header.png";
import Header from "../../../SharedModule/components/Header/Header";
import NoData from "../../../SharedModule/components/NoData/NoData";

import Modal from 'react-bootstrap/Modal';
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import { Link } from "react-router-dom";


export default function CategoriesList() {

  let [categoriesList, setCategoriesList] = useState([]);
  let {register,handleSubmit,formState:{errors}}= useForm();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showDelete, setShowDelete] = useState(false);
  const [showId, setShowId] = useState();

  const [name, setName] = useState("");

  const [pageNumber, setPageNumber] = useState(0);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState([]);

 
  const getCategoryIdValue = (data) => {
    setName(data.target.value);
    getCategoriesList(name,pageNumber);
  };
 

  const handleDeleteshow = (showId) =>{
   setShowId(showId)
    setShowDelete(true);
  } 
  const handleDeleteClose = () => setShowDelete(false);


  let deleteCategoriesList = async () => {
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Category/${showId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      getCategoriesList("",pageNumber);
      handleDeleteClose();
    } catch (error) {
      
    }
  };
  let getCategoriesList = async (name,pageNum) => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=7&pageNumber="+
        pageNum,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params:{
            name:name
          }
        }
      );
      setCategoriesList(response?.data?.data);
      setTotalNumberOfPages(Array(response?.data?.totalNumberOfPages).fill().map((_,i)=>i+1))
    } catch (error) {}
  };



let onSubmit= async(data)=>{
  try {
     await axios.post("https://upskilling-egypt.com:3006/api/v1/Category",data,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    handleClose()
    getCategoriesList(name,pageNumber);
  } catch (error) {
    console.log(error);
  }
}

  useEffect(() => {
    getCategoriesList("",pageNumber);
  }, []);
  return (
    <>
    <Modal  show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Add Category</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    
    <form onSubmit={handleSubmit(onSubmit)}>
    <div>
    <div className="input-group mb-3  ">
   
    <input type="text" className="form-control " placeholder="Category Name" {...register("name",{
      required:"Category is requierd",
     
    })} />
    </div>
    {errors.name&&<p className="alert alert-danger"> {errors.name.message}</p>}
    <div className=" d-flex justify-content-end">
    <button className="btn bg-success w-25 p-1 text-white my-1">Save</button>
    </div>
    </div>
    </form>
    </Modal.Body>
    <Modal.Footer>
     
     
    </Modal.Footer>
  </Modal>


    <Modal  show={showDelete} onHide={handleDeleteClose}>
    <Modal.Header closeButton>
      <Modal.Title>Delete Category</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    
    <DeleteData item="Category" deleteList={deleteCategoriesList}></DeleteData>
    </Modal.Body>

  </Modal>
      <Header
        title={"Categories"}
        title2={"Items"}
        image={avatar}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      >
     
      </Header>
      <div className="container-fluid">
        <div className="row px-3">
          <div className="col-md-6 ">
            <h4> Categories Table Details</h4>
            <span>You can check all details</span>
          </div>
          <div className="col-md-6 d-flex justify-content-end  my-3">
            <button className="btn btn-success" onClick={handleShow}>Add New Category </button>
          </div>
          <div className="row ">
          <div className="col-md-6 ">
            <div className="input-group mb-1  ">
              <input
                type="text"
                className="form-control "
                placeholder="Search here with Name"
                onChange={getCategoryIdValue}
              />
            </div>
          </div>
          </div>
          {categoriesList.length>0?
            <>
          <Table striped bordered hover  >
            <thead >
              <tr>
                <th>ID</th>
                <th>Category Name</th>
                <th>Category Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody  >
            
               {categoriesList.map((elem, index) => (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>{elem.name}</td>
                <td>{elem.creationDate}</td>
                <td>
                  {
                    <Dropdown as={ButtonGroup} className="w-25">
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown-split-basic"
                      />
                      <Dropdown.Menu>
                        <div className="d-flex">
                          <button className="btn btn-danger mx-1" onClick={()=>handleDeleteshow(elem.id)}>
                            <i className="fa-solid fa-trash"></i>
                          </button>
                          <button className="btn btn-warning  mx-1">
                            <i className="fa-solid fa-edit"></i>
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
          :<NoData/>}
        </div>
        {totalNumberOfPages.length>0? <nav aria-label="Page navigation ">
        <ul className="pagination">
          <li className="page-item">
            <Link disabled={pageNumber === 0?true:false}
              className="page-link"
              aria-label="Previous"
              onClick={() => {
                pageNumber > 0
                  ? setPageNumber(pageNumber - 1)
                  : setPageNumber(0);
                getCategoriesList(name, pageNumber);
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
                getCategoriesList(name, pageNum);
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
                  getCategoriesList(name, pageNumber);
              }}
            >
              <span aria-hidden="true" >&raquo;</span>
            </Link>
          </li>
        </ul>
      </nav>:''}
       
      </div>
    </>
  );
}
