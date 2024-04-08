"use client";
import React, { useState } from 'react';

const Page = () => {
  const initialTimetableForm = {
    start: '',
    end: '',
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: '',
  };
  const [number, setNumber] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [timetable, setTimetable] = useState([]);
  const [tables, setTables] = useState([]);
  const [rows , setrows] = useState();
  const [bool,setbool] = useState(false);


  const submitForm = (e) => {
    e.preventDefault();
    if (parseInt(number) > 0) {
      setTables(Array.from({ length: parseInt(number) }, () => ({ ...timetable })));
      setIsSubmit(true);
    } else {
      console.log("Please enter a valid number greater than 0.");
    }
  };

  const submitTable = (e, formIndex) => {
    e.preventDefault();
    // Do something with timetable[formIndex]
  };

  const addRow = (formIndex) => {
    const newTable = Array.from({ length: parseInt(rows) }, () => ({ ...initialTimetableForm }));
    setTables(prevTables => {
      const updatedTables = [...prevTables];
      updatedTables[formIndex] = newTable;
      return updatedTables;
    });

    console.log(tables);
  };
  const conform = () => {
    setbool(true);
  }
  const getTable =() => {
    console.log(tables);
  }

 

  return (
    <>
      <form onSubmit={submitForm}>
        <input
          type='number'
          placeholder='Enter the Number of Subjects'
          value={number}
          onChange={(change) => {
            setNumber(change.target.value);
          }}
        />
        <button type='submit'>Enter</button>
      </form>
          
      {isSubmit && tables.map((form, formIndex) => (
        <form key={formIndex} onSubmit={(e) => submitTable(e, formIndex)}>
          <input type='number' placeholder='enter no of rows' onChange={(change)=>{setrows(change.target.value)}} />
          <button type='button' onClick={() => addRow(formIndex)}>add Row</button>
        </form>
      ))}
      {isSubmit &&<button type='button' onClick={conform}>conform</button>}

      {bool && tables.map((form, index) => (
  <div key={index}>
    {Array.isArray(form) && form.map((obj, i) => (
      <div   key={i}>
      <input 
        type='time' 
       
        placeholder='enter start time'  
        onChange={(change) => { 
          const updatedTables = [...tables];
          updatedTables[index][i] = { ...updatedTables[index][i], start: change.target.value };
          setTables(updatedTables);
        }}
      />
      <input 
        type='time' 
          
        placeholder='enter end time'  
        onChange={(change) => { 
          const updatedTables = [...tables];
          updatedTables[index][i] = { ...updatedTables[index][i], end: change.target.value };
          setTables(updatedTables);
        }}
      />

      <input 
        type='text' 
          
        placeholder='enter lacture on monday'  
        onChange={(change) => { 
          const updatedTables = [...tables];
          updatedTables[index][i] = { ...updatedTables[index][i], monday: change.target.value };
          setTables(updatedTables);
        }}
      />


      <input 
        type='text' 
          
        placeholder='enter lacture on Tuesday'  
        onChange={(change) => { 
          const updatedTables = [...tables];
          updatedTables[index][i] = { ...updatedTables[index][i], tuesday: change.target.value };
          setTables(updatedTables);
        }}
      />



      <input 
        type='text' 
          
        placeholder='enter lacture on wednesday'  
        onChange={(change) => { 
          const updatedTables = [...tables];
          updatedTables[index][i] = { ...updatedTables[index][i], wednesday: change.target.value };
          setTables(updatedTables);
        }}
      />





      <input 
        type='text' 
          
        placeholder='enter lacture on thursday'  
        onChange={(change) => { 
          const updatedTables = [...tables];
          updatedTables[index][i] = { ...updatedTables[index][i], thursday: change.target.value };
          setTables(updatedTables);
        }}
      />




    <input 
        type='text' 
          
        placeholder='enter lacture on friday'  
        onChange={(change) => { 
          const updatedTables = [...tables];
          updatedTables[index][i] = { ...updatedTables[index][i], friday: change.target.value };
          setTables(updatedTables);
        }}
      />



    <input 
        type='text' 
          
        placeholder='enter lacture on saturday'  
        onChange={(change) => { 
          const updatedTables = [...tables];
          updatedTables[index][i] = { ...updatedTables[index][i], saturday: change.target.value };
          setTables(updatedTables);
        }}
      />






      {/* <button type='submit'>submit</button> */}
      
      </div>
    ))}
    <button type='button' onClick={getTable}>add Table</button>
  </div>
))}


    </>
  );
};

export default Page;
