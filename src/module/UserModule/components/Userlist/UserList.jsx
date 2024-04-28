import React from 'react'
import avatar from "../../../../assets/images/header.png"
import Header from '../../../SharedModule/components/Header/Header'
export default function UserList() {
  return (
    <>
    <Header title={"User" } title2={"List"} image={avatar} description={"You can now add your items that any user can order it from the Application and you can edit"}> </Header>
    </>
  )
}
