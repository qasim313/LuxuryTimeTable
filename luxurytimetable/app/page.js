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
     <div className="flex items-center justify-center h-screen w-screen opacity-80 bg-[radial-gradient(circle_at_44%_13%,_hsla(237,0%,100%,0.05)_0%,_hsla(237,0%,100%,0.05)_98%,transparent_98%,_transparent_100%),radial-gradient(circle_at_87%_84%,_hsla(237,0%,100%,0.05)_0%,_hsla(237,0%,100%,0.05)_46%,transparent_46%,_transparent_100%),radial-gradient(circle_at_84%_60%,_hsla(237,0%,100%,0.05)_0%,_hsla(237,0%,100%,0.05)_40%,transparent_40%,_transparent_100%),radial-gradient(circle_at_21%_32%,_hsla(237,0%,100%,0.05)_0%,_hsla(237,0%,100%,0.05)_28%,transparent_28%,_transparent_100%),radial-gradient(circle_at_57%_12%,_hsla(237,0%,100%,0.05)_0%,_hsla(237,0%,100%,0.05)_34%,transparent_34%,_transparent_100%),radial-gradient(circle_at_33%_60%,_hsla(237,0%,100%,0.05)_0%,_hsla(237,0%,100%,0.05)_29%,transparent_29%,_transparent_100%),radial-gradient(circle_at_3%_11%,_hsla(237,0%,100%,0.05)_0%,_hsla(237,0%,100%,0.05)_60%,transparent_60%,_transparent_100%),radial-gradient(circle_at_0%_74%,_hsla(237,0%,100%,0.05)_0%,_hsla(237,0%,100%,0.05)_87%,transparent_87%,_transparent_100%),linear-gradient(45deg,_rgb(99,_105,_190),rgb(99,_70,_205))]">
      <div className='flex items-center justify-center  bg-rose-400 h-96 w-96 rounded-md shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] '>
      <form onSubmit={submitForm} className="form ">  {/* Added classes */}
        <input
          className="number-input rounded-md text-center justify-center h-10 w-60"
          type="number"
          placeholder="Enter the Number of Subjects"
          value={number}
          onChange={(event) => setNumber(event.target.value)}
        />
        <button  type='submit' class="transition ease-in-out delay-150 bg-blue-600 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-300 ... flex mt-6 ml-20 w-20 text-center justify-center text-white rounded-md h-7 blur-none">
              Enter
        </button>
      </form>
      </div>
    </div>
          
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
