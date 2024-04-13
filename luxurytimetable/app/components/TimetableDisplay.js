import React from 'react';

const TimetableDisplay = ({ timetable }) => {
  return (
    <div className="timetable">
      {Object.entries(timetable).map(([day, slots]) => (
        <div key={day} className="day">
          <h3>{day}</h3>
          {slots.map((slot, index) => (
            <div key={index} className="slot">
              <span>{slot.start} - {slot.end}</span>
              <span>{slot.subject} (Section {slot.section})</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TimetableDisplay;
