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
  const [preferences, setPreferences] = useState({
    daysOff: [],
    arrivalTimes: {},
    departureTimes: {},
    gapBetweenLectures: 0,
  });
  const [generatedTimetable, setGeneratedTimetable] = useState(null);
  const [timetableError, setTimetableError] = useState("");

  const handleNext = () => {
    if (numSubjects <= 0) {
      toast.error("Please enter a valid number of subjects");
      return;
    }
    const newSubjects = Array.from(
      { length: parseInt(numSubjects, 10) },
      (_, index) => ({
        id: Date.now() + index, // Ensure unique ID generation
        name: `Subject ${index + 1}`,
        sections: [],
      })
    );
    setSubjects(newSubjects);
    setCurrentStep(steps.SUBJECT_MANAGEMENT);
  };

  const validate = () => {
    console.log("hi");
    console.log(subjects);
    // Map through each subject and its sections to ensure no null or empty values
    const isValid = subjects.every(subject => {
        // Check if subject has a non-empty name
        if (!subject.name.trim()) {
            console.error("Subject name is empty");
            return false;
        }

        // Check each section of the subject
        return subject.sections.every(section => {
            // Check if section has a non-empty name
            if (!section.name.trim()) {
                console.error("Section name is empty");
                return false;
            }

            // Check if section has timeslots and they are all filled correctly
            return section.timeslots && section.timeslots.every(timeslot => {
                // Check if timeslot day, start time, and end time are not empty
                if (timeslot.day==="" || timeslot.start==="" || timeslot.end==="") {
                    console.error("Timeslot information is incomplete", timeslot);
                    return false;
                }
                return true;
            });
        });
    });

    // Return true if all checks pass, false otherwise
    return isValid;
};


  const handleSubmitSubjects = () => {
    if (!validate()) {
      toast.error("Each subject must have at least one section.");
      return;
    }
   
    setCurrentStep(steps.PREFERENCES_INPUT);
  };

  const handlePreferencesSubmit = (preferencesData) => {
    setPreferences(preferencesData);
    const { timetable, error } = generateTimetable(subjects, preferencesData);

    if (error) {
      setTimetableError(error);
      setGeneratedTimetable(null);
      setCurrentStep(steps.TIMETABLE_DISPLAY);
    } else {
      setGeneratedTimetable(timetable);
      setTimetableError("");
      setCurrentStep(steps.TIMETABLE_DISPLAY);
    }
  };

  function generateTimetable(subjects, preferences) {
    // Example algorithm for timetable generation



    return { timetable: {}, error: null };
  }

  const handleBack = () => {
    if (currentStep === steps.SUBJECT_MANAGEMENT) {
      setCurrentStep(steps.SUBJECT_INPUT);
    } else if (currentStep === steps.PREFERENCES_INPUT) {
      setCurrentStep(steps.SUBJECT_MANAGEMENT);
    } else if (currentStep === steps.TIMETABLE_DISPLAY) {
      if (timetableError) {
        setCurrentStep(steps.PREFERENCES_INPUT);
      } else {
        setCurrentStep(steps.SUBJECT_MANAGEMENT);
      }
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
              <button
                onClick={handleBack}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none"
              >
                Back to Preferences
              </button>
            </div>
          ) : (
            <TimetableDisplay timetable={generatedTimetable} />
          )}
        </>
      )}
    </div>
  );
}
