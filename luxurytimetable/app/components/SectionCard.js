// app/components/SectionCard.js
import React, { useState } from 'react';
import TimeSlot from './TimeSlot';

const SectionCard = ({ section, subjectIndex, sectionIndex, subjects, setSubjects }) => {
  const [sectionName, setSectionName] = useState(section.name);
  
  const handleAddTimeSlot = () => {
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].sections[sectionIndex].timeslots.push({
      day: '',
      startTime: '',
      endTime: '',
    });
    setSubjects(updatedSubjects);
  };

  const handleSectionNameChange = (e) => {
    setSectionName(e.target.value);
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].sections[sectionIndex].name = e.target.value;
    setSubjects(updatedSubjects);
  };

  return (
    <div className="mt-4 p-4 border rounded shadow">
      <div className="mb-4">
        <input
          type="text"
          value={sectionName}
          onChange={handleSectionNameChange}
          placeholder="Section name"
          className="w-full px-3 py-2 border rounded-md shadow-sm"
        />
      </div>
      {section.timeslots.map((timeslot, timeslotIndex) => (
        <TimeSlot
          key={timeslotIndex}
          timeslot={timeslot}
          section={section}
          sectionIndex={sectionIndex}
          timeslotIndex={timeslotIndex}
          subjects={subjects}
          setSubjects={setSubjects}
          subjectIndex={subjectIndex}
        />
      ))}
      <button
        onClick={handleAddTimeSlot}
        className="px-3 py-2 bg-blue-300 text-white rounded hover:bg-blue-400"
      >
        Add Time Slot
      </button>
    </div>
  );
};

export default SectionCard;
