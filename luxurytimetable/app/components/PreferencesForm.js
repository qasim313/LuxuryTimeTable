import React, { useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { AiOutlineDelete } from 'react-icons/ai'; // For the delete icon

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const PreferencesForm = ({ preferences, setPreferences, onSubmit }) => {
  const [showTimePreferences, setShowTimePreferences] = useState(false);
  const [timePreferences, setTimePreferences] = useState([{ day: '', arrival: '', departure: '' }]);

  const handleDayOffChange = (selectedDays) => {
    setPreferences(prevPreferences => ({
      ...prevPreferences,
      daysOff: selectedDays.map(option => option.value),
    }));
  };

  const handleTimeChange = (index, field, value) => {
    const updatedTimePreferences = [...timePreferences];
    updatedTimePreferences[index][field] = value;
    setTimePreferences(updatedTimePreferences);
  };

  const handleAddTimePreference = () => {
    if (timePreferences.length < daysOfWeek.length) {
      const remainingDays = daysOfWeek.filter(day => !timePreferences.some(p => p.day === day));
      setTimePreferences([...timePreferences, { day: remainingDays.length === 1 ? remainingDays[0] : '', arrival: '', departure: '' }]);
    }
  };

  const handleDeleteTimePreference = (index) => {
    const updatedTimePreferences = timePreferences.filter((_, i) => i !== index);
    setTimePreferences(updatedTimePreferences);
  };

  const handleGapChange = (event) => {
    setPreferences(prevPreferences => ({
      ...prevPreferences,
      gapBetweenLectures: parseInt(event.target.value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ ...preferences, timePreferences });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Please Add Your Preferences</h2>

      <div>
        <label className="block mb-2">Select OFF Days:</label>
        <MultiSelect
          options={daysOfWeek.map(day => ({ label: day, value: day }))}
          value={preferences.daysOff.map(day => ({ label: day, value: day }))}
          onChange={handleDayOffChange}
          labelledBy="Select"
          className="multi-select"
        />
      </div>

      <div>
        <label>
          Gap Between Lectures (minutes):
          <input
            type="number"
            value={preferences.gapBetweenLectures}
            onChange={handleGapChange}
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </label>
      </div>

      <button
        type="button"
        onClick={() => setShowTimePreferences(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none mt-4"
      >
        Add Arrival and Departure Time Preference
      </button>

      <br></br>
      {showTimePreferences && timePreferences.map((timePreference, index) => (
        <div key={index} className="flex gap-4 items-center">
          <select
            value={timePreference.day}
            onChange={(e) => handleTimeChange(index, 'day', e.target.value)}
            className="block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          >
            <option value="">Select Day</option>
            {daysOfWeek.filter(day => !timePreferences.some(p => p.day === day) || timePreference.day === day).map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          <input
            type="time"
            value={timePreference.arrival}
            onChange={(e) => handleTimeChange(index, 'arrival', e.target.value)}
            className="block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
          <input
            type="time"
            value={timePreference.departure}
            onChange={(e) => handleTimeChange(index, 'departure', e.target.value)}
            className="block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
          <AiOutlineDelete
            onClick={() => handleDeleteTimePreference(index)}
            className="cursor-pointer text-red-500 hover:text-red-700"
          />
        </div>
      ))}

      {showTimePreferences && timePreferences.length < daysOfWeek.length && (
        <button
          type="button"
          onClick={handleAddTimePreference}
          className="px-4 py-2 mt-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
        >
          Add Day
        </button>
      )}

      <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none">
        Submit Preferences
      </button>
    </form>
  );
};

export default PreferencesForm;
