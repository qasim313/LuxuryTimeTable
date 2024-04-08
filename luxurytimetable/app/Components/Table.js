"use client";
import React, { useState } from 'react';

const Table = (props) => {
  const initialFormState = {
    start: '',
    end: '',
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: '',
    rows: [{ id: 1 }],
  };

  const [timetable, setTimetable] = useState(
    Array.from({ length: parseInt(props.value) }, () => ({ ...initialFormState }))
  );

  const handleFormChange = (index, field, value) => {
    const updatedTimetable = [...timetable];
    updatedTimetable[index] = { ...updatedTimetable[index], [field]: value };
    setTimetable(updatedTimetable);
  };

  const handleFormSubmit = (e, index) => {
    e.preventDefault();
    console.log('Form submitted:', timetable[index]);
  };

  const addRow = (formIndex) => {
    const updatedTimetable = [...timetable];
    const newRow = { id: updatedTimetable[formIndex].rows.length + 1 };
    updatedTimetable[formIndex].rows.push(newRow);
    setTimetable(updatedTimetable);
  };

  return (
    <>
      {timetable.map((form, formIndex) => (
        <form key={formIndex} onSubmit={(e) => handleFormSubmit(e, formIndex)}>
          {form.rows.map((row, rowIndex) => (
            <div key={rowIndex} className="table-row">
              <label className="table-label bg-blue-500">Start Time</label>
              <input
                type="time"
                value={form.start}
                onChange={(e) => handleFormChange(formIndex, 'start', e.target.value)}
                className="table-input"
              />
              <label className="table-label">End Time</label>
              <input
                type="time"
                value={form.end}
                onChange={(e) => handleFormChange(formIndex, 'end', e.target.value)}
                className="table-input"
              />
              {/* Add other inputs here */}
            </div>
          ))}
          <button type="button" onClick={() => addRow(formIndex)} className="add-row-button transition ease-in-out delay-150 bg-blue-600 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-300 ... flex mt-6 ml-20 w-20 text-center justify-center text-white rounded-md h-7 blur-none">
            Add Row
          </button>
          <button type="submit" className="submit-button transition ease-in-out delay-150 bg-blue-600 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-300 ... flex mt-6 ml-20 w-20 text-center justify-center text-white rounded-md h-7 blur-none">
            Submit
          </button>
        </form>
      ))}
    </>
  );
  
};

export default Table;
