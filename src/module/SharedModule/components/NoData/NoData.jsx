import React from 'react'
import noData from "../../../../assets/images/no-data.png"
export default function NoData() {
  return (
    <>
      <div className='d-flex justify-content-center align-items-center'>
      
      <div className='text-center' >
      <img src={noData} alt="noData"></img>
      <p className='fw-bold'>No Data! </p>
      <p className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
      
      </div>
      
      
      </div>
    </>
  )
}
