import React from 'react'

export default function Navbar({loginData}) {

  return (
    <div>
  
      <h2>{loginData?.userName}</h2>
    </div>
  )
}
