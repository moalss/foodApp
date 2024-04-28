import React from 'react'
import Header from '../../../SharedModule/components/Header/Header'
import home_avatar from "../../../../assets/images/home-avatar.svg"
export default function Dashboard() {
  return (
    <>
    <Header title={"Welcome" } title2={"Upskilling!"} image={home_avatar} description={"This is a welcoming screen for the entry of the application , you can now see the options"}> </Header>
    
    </>
  )
}
