import { createContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export let ToasterContext=createContext("");

export default function ToasterContextProvider(props){

   let getToasterValue=(type,message)=>{
   return toast[type](message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        });
   }

   return (
    <>
    <ToasterContext.Provider value={{getToasterValue}}>
    {props.children}
    </ToasterContext.Provider>
    </>
   )
}