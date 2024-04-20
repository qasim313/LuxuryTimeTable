import React from 'react';

const TimetableDisplay = ({ timetable }) => {
  // Function to create the grid structure for the timetable
  const generateGrid = (timetable) => {
    const grid = {};
    // Organizing entries by day and time slots
    Object.entries(timetable).forEach(([subjectName, sections]) => {
      sections.forEach(section => {
        section.timeslots.forEach(slot => {
          const day = slot.day;
          const timeRange = `${slot.startTime}-${slot.endTime}`;
          if (!grid[timeRange]) {
            grid[timeRange] = {};
          }
          if (!grid[timeRange][day]) {
            grid[timeRange][day] = [];
          }
          grid[timeRange][day].push(`${subjectName} (Section ${section.name})`);
        });
      });
    });
    return grid;
  };

  // Generating the grid structure from timetable data
  const timetableGrid = generateGrid(timetable);

  // Extracting unique days from all timeslots for consistent rows
  const allDays = new Set();
  Object.values(timetableGrid).forEach(timeslot => {
    Object.keys(timeslot).forEach(day => allDays.add(day));
  });
  const sortedDays = Array.from(allDays).sort();

  return (
    <div className="timetable">
      <table className="table-fixed border-collapse border border-gray-300 w-full mt-4">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2 bg-gray-100">Time/Day</th>
            {sortedDays.map((day, index) => (
              <th key={index} className="border border-gray-200 p-2 bg-gray-100">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(timetableGrid).map(([timeslot, days]) => (
            <tr key={timeslot}>
              <td className="border border-gray-200 p-2">{timeslot}</td>
              {sortedDays.map((day, index) => (
                <td key={index} className="border border-gray-200 p-2 text-center">
                  {days[day] ? days[day].join(', ') : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimetableDisplay;

