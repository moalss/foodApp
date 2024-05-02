
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import ChangPass from "./module/AuthenticationModule/components/Changpass/ChangPass";
import ForgetPass from "./module/AuthenticationModule/components/Forgetpass/ForgetPass";
import Login from "./module/AuthenticationModule/components/Login/Login";
import Register from "./module/AuthenticationModule/components/Register/Register";
import ResetPass from "./module/AuthenticationModule/components/ResetPass/ResetPass";
import VerifyAccount from "./module/AuthenticationModule/components/VerifyAccount/VerifyAccount";
import CategoriesList from "./module/CategoriesModule/componants/Categorieslist/CategoriesList";
import Dashboard from "./module/HomeModule/components/Dashboard/Dashboard";
import RecipeData from "./module/RecipesModul/componants/RecipeData/RecipeData";
import RecipesList from "./module/RecipesModul/componants/Recipeslist/RecipesList";
import AuthLayout from "./module/SharedModule/components/Authlayout/AuthLayout";
import MaserLayout from "./module/SharedModule/components/MasterlayOut/MaserLayout";
import Notfound from "./module/SharedModule/components/Notfound/Notfound";
import ProtectedRoute from "./module/SharedModule/components/protectedRoute/ProtectedRoute";
import UserList from "./module/UserModule/components/Userlist/UserList";
function App() {
 
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

  let routes = createBrowserRouter([
    {
      path: 'dashboard',
      element:<ProtectedRoute loginData={loginData}> <MaserLayout loginData={loginData}/></ProtectedRoute>,
      errorElement: <Notfound/>,
      children: [
        {path:"",element:<Dashboard/>},
        {path:"dashboard",element:<Dashboard/>},
        {path:"user",element:<UserList></UserList>} ,
       { path:"recipes",element:<RecipesList></RecipesList>} ,
       { path:"recipedata",element:<RecipeData></RecipeData>} ,
       { path:"categories",element:<CategoriesList></CategoriesList>} ,

      ],
    },
    {
      path:"/" ,element:<AuthLayout/>,errorElement:<Notfound/>,
      children:[
        {path:"",element:<Login loginInfo={loginInfo}/>},
        {path:"login",element:<Login loginInfo={loginInfo}/>},
        {path:"forgetpass",element:<ForgetPass/>} ,
       { path:"changepass",element:<ChangPass/>} ,
       { path:"resetpass",element:<ResetPass/>} ,
       { path:"register",element:<Register/>} ,
       { path:"verifyaccount",element:<VerifyAccount/>} ,
      ]
    },
  ]);
  
  return <> <RouterProvider router={routes}></RouterProvider> <ToastContainer /></>;
  
}

export default App;
