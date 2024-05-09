import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AuthContext=createContext(null);

export default function AuthContextProvider(props){
   const baseUrl="https://upskilling-egypt.com:3006/api/v1/";
   const requestHeader={Authorization: `Bearer ${localStorage.getItem("token")}`} ;
    let [loginData,setLoginData]=useState(null);

    let loginInfo=()=>{
     let tokenInfo=localStorage.getItem("token");
     
       let decodeTokenInfo=jwtDecode(tokenInfo);
           setLoginData(decodeTokenInfo);
    }
   useEffect(()=>{
   if(localStorage.getItem("token")){
     loginInfo();
   
   }
   
   
   },[]);

return(
<>
<AuthContext.Provider value={{loginData,loginInfo,baseUrl,requestHeader}}  >
{props.children}

</AuthContext.Provider>

</>


);
};