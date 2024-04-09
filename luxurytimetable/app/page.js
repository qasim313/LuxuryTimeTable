
"use client"
import React, { useState } from 'react';

const Page = () => {
  const [subjectNames, setSubjectNames] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const subjectData = {
    subjectname: "",
    sections: []
  };
  const sectionData = {
    sectionnames: "",
    times: []
  };
  const sectiontimes = {
    start: "",
    end: "",
    day: "",
  };

  const [subjectNumber, setSubjectNumber] = useState(0);

  const submitForm = (e) => {
    e.preventDefault();
    setSubjects(
      Array.from({ length: subjectNumber }, () => ({ ...subjectData }))
    );

    const newSubjectNames = [];
    for (let index = 0; index < subjectNumber; index++) {
      newSubjectNames.push("subject " + (index + 1));
    }
    setSubjectNames(newSubjectNames);
  };

  // const addTimeSlot=()=>{

  // }


  const addTimeSlot = (subIndex, secindex) => {
    const newSubjects = [...subjects];
    const newSections = [...newSubjects[subIndex].sections];
    const section = { ...newSections[secindex] };
    const newTimeSlot = { ...sectiontimes };
    section.times = [...section.times, newTimeSlot];
    newSections[secindex] = section;
    newSubjects[subIndex].sections = newSections;
    setSubjects(newSubjects);
  };
  

  
  const displaySections = (e, index, c) => {
    const newSubjects = [...subjects];
    newSubjects[index].sections = Array.from({ length: c }, () => ({ ...sectionData }));
    setSubjects(newSubjects);
    for(let i = 0 ; i < c ;i++)
    addTimeSlot(index,i);
    console.log(subjects)
  };
  //console.log(subjects)
  return (
    <>
      <form onSubmit={submitForm}>
        <input type='number' placeholder='enter number of subjects' value={subjectNumber} onChange={(change) => { setSubjectNumber(change.target.value) }} />
        <button type='submit'>submit</button>
      </form>

      {subjects.map((obj, index) => (
        <form key={index}>
          <input 
            value={subjectNames[index]} 
            onChange={(e) => {
              const newSubjectNames = [...subjectNames];
              newSubjectNames[index] = e.target.value;
              setSubjectNames(newSubjectNames);
              const newSubjects = [...subjects];
              newSubjects[index].subjectname = e.target.value;
              setSubjects(newSubjects);
            }}
          />

          <label>Enter Number of Sections</label>
          <input type='number' onChange={(change)=>{displaySections(obj,index,parseInt(change.target.value))}}  /> 
          { obj.sections.map ((o,val)=>(
            <div key={val}>
              <input placeholder='enter section name'  onChange={(change)=>{o.sectionnames=change.target.value}}/>

              {o.times.map((time, idx) => (
                <div key={idx}>
                <input type='time' onChange={(change) => { 
                      const newTimes = [...o.times]; 
                      newTimes[idx] = { ...newTimes[idx], start: change.target.value }; 
                      o.times = newTimes;
                  }} />
                  <input type='time' onChange={(change) => { 
                      const newTimes = [...o.times]; 
                      newTimes[idx] = { ...newTimes[idx], end: change.target.value }; 
                      o.times = newTimes; 
                  }} />
                  <select onChange={(change) => { 
                      const newTimes = [...o.times]; 
                      newTimes[idx] = { ...newTimes[idx], day: change.target.value }; 
                      o.times = newTimes; 
                  }}>
                    <option value="">Select a Day</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>


                </div>
              ))}
              <button type='button' onClick={() => addTimeSlot(index,val)}>Add Time Slot</button>
            </div>
          ))   
          }
        </form>
      ))}
    </>
  );

  
};

export default Page;
