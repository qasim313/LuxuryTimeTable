// app/components/TimeSlot.js
import React from 'react';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const TimeSlot = ({ timeslot, timeslotIndex, sectionIndex, subjectIndex, subjects, setSubjects }) => {
  const handleTimeSlotChange = (field, value) => {
    const updatedSubjects = [...subjects];
    const section = updatedSubjects[subjectIndex].sections[sectionIndex];
    section.timeslots[timeslotIndex] = { ...section.timeslots[timeslotIndex], [field]: value };
    setSubjects(updatedSubjects);
  };

  return (
    <div className="flex space-x-2 mb-2">
      <select
        value={timeslot.day}
        onChange={(e) => handleTimeSlotChange('day', e.target.value)}
        className="w-1/3 px-3 py-2 border rounded-md shadow-sm"
      >
        <option value="">Select Day</option>
        {daysOfWeek.map((day) => (
          <option key={day} value={day}>{day}</option>
        ))}
      </select>
      <input
        type="time"
        value={timeslot.startTime}
        onChange={(e) => handleTimeSlotChange('startTime', e.target.value)}
        className="w-1/3 px-3 py-2 border rounded-md shadow-sm"
      />
      <input
        type="time"
        value={timeslot.endTime}
        onChange={(e) => handleTimeSlotChange('endTime', e.target.value)}
        className="w-1/3 px-3 py-2 border rounded-md shadow-sm"
      />
    </div>
  );
};

export default TimeSlot;
