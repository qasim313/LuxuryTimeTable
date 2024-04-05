"use client"
import React, { useState } from 'react';

const Table = (props) => {

  const [timetable , settimetable] = useState([]);
  const [sunday , setSunday] = useState();
  const [monday , setMonday] = useState();
  const [tuesday , setTuesday] = useState();
  const [wednessday , setWednessday] = useState();
  const [thursday , setThursday] = useState();
  const [friday , setFriday] = useState();
  const [saturday , setSaturday] = useState();
  const [start , setStart] = useState();
  const [end,setEnd] = useState();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    settimetable([...timetable, {start, end, monday, tuesday, wednessday, thursday, friday, saturday, sunday}]);
    setEnd("");
    setFriday("");
    setMonday("");
    setSaturday("");
    setStart("");
    setWednessday("");
    setThursday("");
    setTuesday("");
    setSunday("");
  };

  return (
    <>
      {[...Array(props.value)].map((_, index) => (
        <>
        <form key={index} onSubmit={handleFormSubmit}>
          <input type='time' value={start} onChange={(change) => setStart(change.target.value)} />
          
          <input type='time' value={end} onChange={(change) => setEnd(change.target.value)} />
          <input type='text' value={monday} onChange={(change) => setMonday(change.target.value)} />
          <input type='text' value={tuesday} onChange={(change) => setTuesday(change.target.value)} />
          <input type='text' value={wednessday} onChange={(change) => setWednessday(change.target.value)} />
          <input type='text' value={thursday} onChange={(change) => setThursday(change.target.value)} />
          <input type='text' value={friday} onChange={(change) => setFriday(change.target.value)} />
          <input type='text' value={saturday} onChange={(change) => setSaturday(change.target.value)} />
          <input type='text' value={sunday} onChange={(change) => setSunday(change.target.value)} />
          <button type='submit'>enter</button>
        </form>
        <br/>
        </>
      ))}

      
    </>
  );
}

export default Table;
