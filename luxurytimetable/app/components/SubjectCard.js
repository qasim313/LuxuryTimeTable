// app/components/SubjectCard.js
import React from 'react';
import SectionCard from './SectionCard';

const SubjectCard = ({ subject, subjects, setSubjects, subjectIndex }) => {
  const updateSubjectName = (e) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].name = e.target.value;
    setSubjects(updatedSubjects);
  };

  const addSection = () => {
    const updatedSubjects = [...subjects];
    const newSection = { name: '', timeslots: [] };
    updatedSubjects[subjectIndex].sections.push(newSection);
    setSubjects(updatedSubjects);
  };

  return (
    <div className="border rounded-lg p-4 my-4 shadow-lg">
      <input
        type="text"
        value={subject.name}
        onChange={updateSubjectName}
        className="text-lg font-bold border-0 p-2 rounded"
      />
      {subject.sections.map((section, index) => (
        <SectionCard
          key={index}
          section={section}
          subject={subject}
          subjectIndex={subjectIndex}
          sectionIndex={index}
          subjects={subjects}
          setSubjects={setSubjects}
        />
      ))}
      <button
        onClick={addSection}
        className="mt-2 px-3 py-1 bg-blue-300 text-white rounded-md hover:bg-blue-400"
      >
        Add Section
      </button>
    </div>
  );
};

export default SubjectCard;
