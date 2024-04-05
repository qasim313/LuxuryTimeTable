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
            <div key={rowIndex}>
              <label>Start Time</label>
              <input
                type="time"
                value={form.start}
                onChange={(e) => handleFormChange(formIndex, 'start', e.target.value)}
              />
              <label>End Time</label>
              <input
                type="time"
                value={form.end}
                onChange={(e) => handleFormChange(formIndex, 'end', e.target.value)}
              />
              {/* Add other inputs here */}
            </div>
          ))}
          <button type="button" onClick={() => addRow(formIndex)}>Add Row</button>
          <button type="submit">Submit</button>
        </form>
      ))}
    </>
  );
};

export default Table;
