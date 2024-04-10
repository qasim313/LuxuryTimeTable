"use client";
import SubjectCard from './components/SubjectCard';
import PreferencesForm from './components/PreferencesForm';
import TimetableDisplay from './components/TimetableDisplay';
export default function Page() {
  const [numSubjects, setNumSubjects] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [subjectsSubmitted, setSubjectsSubmitted] = useState(false);
  const [preferencesSubmitted, setPreferencesSubmitted] = useState(false);
  const [preferences, setPreferences] = useState({
    daysOff: [],
    arrivalTimes: {},
    departureTimes: {},
    gapBetweenLectures: 0,
  });
  const [generatedTimetable, setGeneratedTimetable] = useState(null);
  const [timetableError, setTimetableError] = useState(null);
  
  const handleNext = () => {
    const newSubjects = Array.from({ length: numSubjects }, (_, index) => ({
      id: index,
      name: `Subject ${index + 1}`,
      sections: [],
    }));
    setSubjects(newSubjects);
  };

  const handleSubmitSubjects = () => {
    setSubjectsSubmitted(true);
  };

  const handlePreferencesSubmit = (preferencesData) => {
    setPreferences(preferencesData);
    const { timetable, error } = generateTimetable(subjects, preferencesData);
  
    if (error) {
      setTimetableError(error);
      setGeneratedTimetable(null);
    } else {
      setGeneratedTimetable(timetable);
      setTimetableError(null);
    }
  
    setPreferencesSubmitted(true);
  };
  
  function generateTimetable(subjects, preferences) {
    const timetable = {};
  
    for (const subject of subjects) {
      let sectionFound = false;
  
      for (const section of subject.sections) {
        if (section.times.every(timeSlot => {
          const { day, start, end } = timeSlot;
          const arrival = preferences.arrivalTimes[day] || '00:00';
          const departure = preferences.departureTimes[day] || '23:59';
  
          // Check if the section's time slot is within the user's arrival and departure times
          if (start < arrival || end > departure) {
            return false;
          }
  
          // Check if there's an existing time slot in the timetable that conflicts with the current section's time slot
          if (timetable[day]) {
            for (const existingSlot of timetable[day]) {
              if ((start >= existingSlot.start && start < existingSlot.end) || (end > existingSlot.start && end <= existingSlot.end)) {
                return false;
              }
            }
          }
  
          return true;
        })) {
          // If the section fits within the user's preferences and doesn't conflict with existing time slots, add it to the timetable
          sectionFound = true;
          section.times.forEach(({ day, start, end }) => {
            if (!timetable[day]) {
              timetable[day] = [];
            }
            timetable[day].push({ subject: subject.name, section: section.name, start, end });
          });
          break;
        }
      }
  
      if (!sectionFound) {
        return { error: `No suitable section found for subject: ${subject.name}` };
      }
    }
  
    return { timetable };
  }

  return (
    <div className="container mx-auto px-4">
      {!subjectsSubmitted ? (
       <>
       <div>
         <br/>
         <label htmlFor="numSubjects" className="block text-sm font-medium text-gray-700">
           Enter Number of Subjects:
         </label>
         <div className="flex items-center space-x-4 mt-1">
           <input
             id="numSubjects"
             type="number"
             value={numSubjects}
             onChange={(e) => setNumSubjects(parseInt(e.target.value))}
             className="block w-1/3 rounded-lg border-2 border-gray-200 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
             placeholder="Enter Number of Subjects"
           />
           <button
             onClick={handleNext}
             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
           >
             Next
           </button>
         </div>
       </div>
       
       {subjects.map((subject, index) => (
         <SubjectCard
           key={index}
           subject={subject}
           setSubjects={setSubjects}
           subjects={subjects}
           subjectIndex={index}
         />
       ))}
  
       <div className="flex justify-end mt-6">
         <button
           onClick={handleSubmitSubjects}
           className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
         >
           Next
         </button>
       </div>
     </>
      ) : !preferencesSubmitted ? (
        <PreferencesForm
          preferences={preferences}
          setPreferences={setPreferences}
          onSubmit={handlePreferencesSubmit}
        />
      ) : timetableError ? (
        <div className="error-message">
          <p>{timetableError}</p>
        </div>
      ) : (
        <TimetableDisplay timetable={generatedTimetable} />
      )}
    </div>
  );
}
