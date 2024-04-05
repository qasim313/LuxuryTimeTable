"use client"
import React, { useState } from 'react'
import Table from "./Components/Table"
const page = () => {


  const [number,setNumber] = useState("");
  const [isSubmit,setIsSubmit] = useState(false);
  const submitForm = (e)=>{
    e.preventDefault();  
    setIsSubmit(true);
  }
  return (
    <>
    <form  onSubmit={submitForm} >
      <input type='number' placeholder='Enter the Number of Subject' value={number} onChange={ (change)=> {
        setNumber(change.target.value);
      }}/>
      <button type='submit' >enter</button>

      {isSubmit && <Table value={number}/>}
    </form> 
    </>
  )


}

export default page
