import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

const TimeSlot = ({ timeslot, onUpdateTimeslot, onDeleteTimeSlot }) => {
  const handleTimeSlotChange = (field, value) => {
    onUpdateTimeslot({ ...timeslot, [field]: value }); 
  };

  return (
    <div className="flex space-x-2 mb-2 items-center">
      <select
        value={timeslot.day}
        onChange={(e) => handleTimeSlotChange('day', e.target.value)}
        className="w-1/3 px-3 py-2 border rounded-md shadow-sm"
      >
        {["select day",'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
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
      <button
        onClick={onDeleteTimeSlot}
        className="text-red-500 hover:text-red-700"
      >
        <AiOutlineDelete size={24} />
      </button>
    </div>
  );
};

export default TimeSlot;
