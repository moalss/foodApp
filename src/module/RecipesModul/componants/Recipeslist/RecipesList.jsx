import React from 'react'
import Header from '../../../SharedModule/components/Header/Header'
import avatar from "../../../../assets/images/header.png"
export default function RecipesList() {
  return (
    <>
    <Header title={"Recipes" } title2={"Items"} image={avatar} description={"You can now add your items that any user can order it from the Application and you can edit"}> </Header>
    </>
  )
}
