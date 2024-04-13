import React from 'react';
import SectionCard from './SectionCard';
import { AiOutlineDelete } from 'react-icons/ai'; // Import for the delete icon

const SubjectCard = ({ subject, subjects, setSubjects, subjectIndex }) => {
  const updateSubjectName = (e) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].name = e.target.value;
    setSubjects(updatedSubjects);
  };

  const addSection = () => {
    const updatedSubjects = [...subjects];
    const newSection = {
      id: Date.now(), // Unique ID based on timestamp
      name: '',
      timeslots: []
    };
    updatedSubjects[subjectIndex].sections.push(newSection);
    setSubjects(updatedSubjects);
  };

  const handleDeleteSubject = () => {
    const updatedSubjects = subjects.filter((_, idx) => idx !== subjectIndex);
    setSubjects(updatedSubjects);
  };

  
  return (
    <div className="border rounded-lg p-4 my-4 shadow-lg">
      <div className="flex justify-between items-center">
        <input
          type="text"
          value={subject.name}
          onChange={updateSubjectName}
          className="text-lg font-bold border-2 p-2 rounded flex-grow"
        />
        <button
          onClick={handleDeleteSubject}
          className="ml-2 text-red-500 hover:text-red-700"
          title="Delete Subject"
        >
          <AiOutlineDelete size={24} />
        </button>
      </div>
      {subject.sections.map((section, index) => (
        <SectionCard
          key={section.id} // Using unique ID as key
          section={section}
          subjectIndex={subjectIndex}
          sectionIndex={index}
          subjects={subjects}
          setSubjects={setSubjects}
        />
      ))}
      <button
        onClick={addSection}
        className="mt-2 ml-2 px-3 py-1 bg-blue-300 text-white rounded-md hover:bg-blue-400"
      >
        Add Section
      </button>
    </div>
  );
};

export default SubjectCard;
