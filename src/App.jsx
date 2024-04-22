
import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ChangPass from "./module/AuthenticationModule/components/Changpass/ChangPass";
import ForgetPass from "./module/AuthenticationModule/components/Forgetpass/ForgetPass";
import Login from "./module/AuthenticationModule/components/Login/Login";
import Register from "./module/AuthenticationModule/components/Register/Register";
import ResetPass from "./module/AuthenticationModule/components/ResetPass/ResetPass";
import CategoriesList from "./module/CategoriesModule/componants/Categorieslist/CategoriesList";
import Dashboard from "./module/HomeModule/components/Dashboard/Dashboard";
import RecipesList from "./module/RecipesModul/componants/Recipeslist/RecipesList";
import AuthLayout from "./module/SharedModule/components/Authlayout/AuthLayout";
import MaserLayout from "./module/SharedModule/components/MasterlayOut/MaserLayout";
import Notfound from "./module/SharedModule/components/Notfound/Notfound";
import UserList from "./module/UserModule/components/Userlist/UserList";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./module/SharedModule/components/protectedRoute/ProtectedRoute";

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
      ]
    },
  ]);

  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
