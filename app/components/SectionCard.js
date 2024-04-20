import React, { useState } from 'react';
import TimeSlot from './TimeSlot';
import { AiOutlineDelete } from 'react-icons/ai';

const SectionCard = ({ section, subjectIndex, sectionIndex, subjects, setSubjects }) => {
  const [sectionName, setSectionName] = useState(section.name);

  const handleAddTimeSlot = () => {
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].sections[sectionIndex].timeslots.push({
      id: Date.now(),  // Ensure each timeslot has a unique ID
      day: '',
      startTime: '',
      endTime: '',
    });
    setSubjects(updatedSubjects);
  };

  const handleDeleteSection = () => {
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].sections.splice(sectionIndex, 1);
    setSubjects(updatedSubjects);
  };
  const handleDeleteTimeSlot = (timeslotIndex) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].sections[sectionIndex].timeslots.splice(timeslotIndex, 1);
    setSubjects(updatedSubjects);
  };
  
  const onUpdateTimeslot = (sectionIndex, timeslotIndex, updatedTimeslot) => {
    const updatedSubjects = [...subjects];
    const section = updatedSubjects[subjectIndex].sections[sectionIndex];
    section.timeslots[timeslotIndex] = updatedTimeslot;
    setSubjects(updatedSubjects);
  };


  return (
    <div className="mt-4 p-4 border rounded shadow">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          value={sectionName}
          onChange={(e) => {
            setSectionName(e.target.value);
            const updatedSections = [...subjects[subjectIndex].sections];
            updatedSections[sectionIndex].name = e.target.value;
            setSubjects(subjects.map((sub, idx) => idx === subjectIndex ? {...sub, sections: updatedSections} : sub));
          }}
          placeholder="Section name"
          className="flex-grow px-3 py-2 border rounded-md shadow-sm"
        />
        <button onClick={handleDeleteSection} className="ml-2 text-red-500 hover:text-red-700">
          <AiOutlineDelete size={24} />
        </button>
      </div>
      {section.timeslots.map((timeslot, timeslotIndex) => (
       <TimeSlot
       key={timeslot.id}
       timeslot={timeslot}
      onUpdateTimeslot={(updatedTimeslot) => onUpdateTimeslot(sectionIndex, timeslotIndex, updatedTimeslot)}
       onDeleteTimeSlot={() => handleDeleteTimeSlot(timeslotIndex)}
       subjectIndex={subjectIndex}
       sectionIndex={sectionIndex}
       timeslotIndex={timeslotIndex}
       subjects={subjects}
       setSubjects={setSubjects}
     />
     
      ))}
      <button onClick={handleAddTimeSlot} className="px-3 py-2 bg-blue-300 text-white rounded hover:bg-blue-400">
        Add Time Slot
      </button>
    </div>
  );
};

export default SectionCard;
