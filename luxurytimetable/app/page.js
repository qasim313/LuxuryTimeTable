"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubjectCard from "./components/SubjectCard";
import PreferencesForm from "./components/PreferencesForm";
import TimetableDisplay from "./components/TimetableDisplay";

const steps = {
  SUBJECT_INPUT: "subject_input",
  SUBJECT_MANAGEMENT: "subject_management",
  PREFERENCES_INPUT: "preferences_input",
  TIMETABLE_DISPLAY: "timetable_display",
};

export default function Page() {
  const [numSubjects, setNumSubjects] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [currentStep, setCurrentStep] = useState(steps.SUBJECT_INPUT);
  const [timePrefObject,setTimePrefObject] = useState({day:"monday",start:"",end:""});
  const [preferences, setPreferences] = useState({
    daysOff: [],
    gapBetweenLectures: 0,
    timePreferences: [],
  });
  const [generatedTimetable, setGeneratedTimetable] = useState(null);
  const [timetableError, setTimetableError] = useState("");

  const handleNext = () => {
    console.log("Num Subjects: ", numSubjects);
    if (numSubjects <= 0) {
      toast.error("Please enter a valid number of subjects");
      return;
    }
    const newSubjects = Array.from(
      { length: parseInt(numSubjects) },
      (_, index) => ({
        id: Date.now() + index, // Ensure unique ID generation
        name: `Subject ${index + 1}`,
        sections: [],
      })
    );
    setSubjects(newSubjects);
    setCurrentStep(steps.SUBJECT_MANAGEMENT);
    console.log("Subjects: ", subjects);
  };

  const validate = () => {
    const isValid = subjects.every((subject) => {
      if (!subject.name.trim()) {
        console.error("Subject name is empty");
        return false;
      }
      return subject.sections.every((section) => {
        if (!section.name.trim()) {
          console.error("Section name is empty");
          return false;
        }
        return (
          section.timeslots &&
          section.timeslots.every((timeslot) => {
            if (
              timeslot.day === "" ||
              timeslot.start === "" ||
              timeslot.end === ""
            ) {
              console.error("Timeslot information is incomplete", timeslot);
              return false;
            }
            return true;
          })
        );
      });
    });

    return isValid;
  };

  const handleSubmitSubjects = () => {
    if (!validate()) {
      toast.error("Error fill all inputs");
      return;
    }
    console.log("Subjects: ", subjects);
    setCurrentStep(steps.PREFERENCES_INPUT);

  };

  const validateSubjectSubmission = () => {
    for (let subject of subjects) {
      if (!subject.name || !subject.sections || subject.sections.length === 0 || s) {
        return false;
      }
    }
    return true;
  };

  const handlePreferencesSubmit = (preferencesData) => {
    setPreferences(preferencesData);
    const { timetable, error } = generateTimetable(subjects, preferencesData);

    setCurrentStep(steps.TIMETABLE_DISPLAY);
    // console.log(preferences);
    // console.log(subjects);
    if (error) {
      setTimetableError(error);
      setGeneratedTimetable(null);
    } else {
      setGeneratedTimetable(timetable);
      setTimetableError("");
    }
  };
//working on it 
function generateTimetable(subjects, preferences) {
  // Initialize a map to hold non-conflicting sections for each subject
  const subjectSectionsMap = new Map();

  // Convert daysOff and timePreferences to Sets for faster lookup
  const daysOffSet = new Set(preferences.daysOff);
  const timePreferencesMap = new Map();
  preferences.timePreferences.forEach(pref => {
    timePreferencesMap.set(pref.day, { arrival: pref.arrival, departure: pref.departure });
  });

  console.log("Days off: ", daysOffSet);
  console.log("Time preferences map: ", timePreferencesMap);

  // Loop through each subject
  subjects.forEach((subject) => {
    // Initialize an array in the map for the subject's non-conflicting sections
    if (!subjectSectionsMap.has(subject.name)) {
      subjectSectionsMap.set(subject.name, []);
    }

    // Loop through each section of the subject
    subject.sections.forEach((section) => {
      // Check if the section's timeslots fit with the preferences
      const nonConflictingTimeslots = section.timeslots.filter((timeslot) => {
        const dayPreference = timePreferencesMap.get(timeslot.day);
        return !daysOffSet.has(timeslot.day) && (
          !dayPreference || (
            (timeslot.startTime >= dayPreference.arrival || timeslot.startTime === "") &&
            (timeslot.endTime <= dayPreference.departure || timeslot.endTime === "")
          )
        );
      });

      // If there are non-conflicting timeslots, add the section to the map
      if (nonConflictingTimeslots.length === section.timeslots.length) {
        subjectSectionsMap.get(subject.name).push({
          ...section,
          timeslots: nonConflictingTimeslots
        });
      }
    });
  });

  // Checking for overlapping timeslots across all subjects
  const occupiedTimeslots = new Map();
  subjectSectionsMap.forEach((sections, subjectName) => {
    sections.forEach((section, index) => {
      section.timeslots.forEach(timeslot => {
        const timeslotKey = `${timeslot.day}-${timeslot.startTime}-${timeslot.endTime}`;
        if (occupiedTimeslots.has(timeslotKey)) {
          const existing = occupiedTimeslots.get(timeslotKey);
          // Check which section to keep (can refine this decision logic)
          if (existing.subjectName !== subjectName) {
            sections.splice(index, 1); // Remove the current section
            index--; // Adjust index after removal
          }
        } else {
          occupiedTimeslots.set(timeslotKey, { subjectName, section });
        }
      });
    });
  });

  // Remove any subjects that might have ended up with zero sections
  for (let [subjectName, sections] of subjectSectionsMap.entries()) {
    if (sections.length === 0) {
      subjectSectionsMap.delete(subjectName);
    }
  }

  console.log("Map after conflict resolution: ", subjectSectionsMap);

  // Convert the map into an object for the final timetable
  const timetable = {};
  subjectSectionsMap.forEach((sections, subjectName) => {
    timetable[subjectName] = sections;
  });
  console.log("Final timetable: ", timetable);

  // Check if the number of keys in the map is less than the number of subjects
  if (Object.keys(timetable).length < numSubjects) {
    return { timetable: null, error: "Error generating timetable" };
  }
  return { timetable, error: null };
}



  

  const handleBack = () => {
    if (currentStep === steps.SUBJECT_MANAGEMENT) {
      setCurrentStep(steps.SUBJECT_INPUT);
    } else if (currentStep === steps.PREFERENCES_INPUT) {
      setCurrentStep(steps.SUBJECT_MANAGEMENT);
    } else if (currentStep === steps.TIMETABLE_DISPLAY) {
      setCurrentStep(steps.PREFERENCES_INPUT);      
    }
  };

  return (
    <div className="container mx-auto px-4">
      <ToastContainer />
      {currentStep === steps.SUBJECT_INPUT && (
        <div>
          <label
            htmlFor="numSubjects"
            className="block text-sm font-medium text-gray-700"
          >
            Enter Number of Subjects:
          </label>
          <div className="flex items-center space-x-4 mt-1">
            <input
              id="numSubjects"
              type="number"
              value={numSubjects}
              onChange={(e) => setNumSubjects(e.target.value)}
              className="block w-1/3 rounded-lg border-2 border-gray-200 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
              placeholder="Enter Number of Subjects"
            />
            <button
              type="submit"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {currentStep === steps.SUBJECT_MANAGEMENT &&
        subjects.map((subject, index) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            setSubjects={setSubjects}
            subjects={subjects}
            subjectIndex={index}
          />
        ))}

      {currentStep === steps.SUBJECT_MANAGEMENT && (
        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none"
          >
            Back
          </button>
          <button
            onClick={handleSubmitSubjects}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
          >
            Next
          </button>
        </div>
      )}

      {currentStep === steps.PREFERENCES_INPUT && (
        <>
          <PreferencesForm
            preferences={preferences}
            setPreferences={setPreferences}
            onSubmit={handlePreferencesSubmit}
          />
          <div className="flex justify-start mt-6">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none"
            >
              Back
            </button>
          </div>
        </>
      )}

      {currentStep === steps.TIMETABLE_DISPLAY && (
        <>
          {timetableError ? (
            <div className="error-message">
              <p>{timetableError}</p>
             
            </div>
          ) : (
            <TimetableDisplay timetable={generatedTimetable} />
          )}
           <button
                onClick={handleBack}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none"
              >
                Back to Preferences
              </button>
        </>
      )}
    </div>
  );
}
