import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import avatar from "../../../../assets/images/header.png";
import { AuthContext } from '../../../../context/AuthContext/AuthContext';
import { ToasterContext } from '../../../../context/ToasterContext/ToasterContext';
import Header from '../../../SharedModule/components/Header/Header';
import NoData from '../../../SharedModule/components/NoData/NoData';
import "react-toastify/dist/ReactToastify.css";

export default function Favo() {

    const [favoriteList,setFavoriteList]=useState([]);
  let {requestHeader,baseUrl,loginData}=useContext(AuthContext);
  let {getToasterValue}=useContext(ToasterContext);


   let deleteFromFavoList= async(id)=>{
    try {
      await axios.delete(
       ` ${baseUrl}userRecipe/${id}`,
        {
          headers: requestHeader,
        }
      );
     

      getToasterValue("success","deleted");
      getFavoritsList()
    } catch (error) {}

   }

  
      let getFavoritsList = async () => {
        try {
          let response = await axios.get(
            `${baseUrl}userRecipe/`,
            {
              headers: requestHeader,
            }
          );
          setFavoriteList(response.data.data);
         
         
        } catch (error) {
          getToasterValue("error",error.response.data.message)

        }
      };
    
     
    
      useEffect(() => {
        getFavoritsList()
      }, []);

  return (
   <>
    <Header title="Favorite" title2="Items" image={avatar} description="You can now add your items that any user can order it from the Application and you can edit" ></Header>
    <div className="container-fluid">
        <div className="row px-3">
          <div className="col-md-6 ">
            <h4> Favorite</h4>
            <span>You can check all details</span>
          </div>
          
        
          {favoriteList.length > 0 ? (
            <>
            <div className='row'>
            {favoriteList.map((elem)=> 
            <div key={elem.id} className='col-md-4 '>
                <div className="card  my-2   bg-body ">
                <div className='position-absolute end-0 px-2'>
                <i className="fa-solid fa-heart" onClick={()=>deleteFromFavoList(elem.id)}></i></div>
                <img className='cardimg rounded' src={
                  "https://upskilling-egypt.com:3006/" + elem.recipe.imagePath
                }></img>
                <div className="card-body">
                <h4 className="card-text">{elem.recipe.name}</h4>
                  <p className="card-text">{elem.recipe.description}</p>
                 
                </div>
              </div>

                    
                     
              </div>
              
              )}
              </div>
               
              
            </>
          ) : (
            <NoData />
          )}
          
        </div>
      </div>
   
   </>
  )
}
