
// src/components/Events.js
import React, { useState } from 'react';

const Events = () => {
  const [events, setEvents] = useState([
    { id: 1, name: 'Hackathon', date: '2024-06-01', description: 'A fun hackathon event', participants: ['Alice', 'Bob'], location: 'Main Hall' },
    { id: 2, name: 'Guest Lecture', date: '2024-06-05', description: 'Lecture by an industry expert', participants: ['Charlie', 'Dave'], location: 'Room 101' },
    { id: 3, name: 'Project Presentation', date: '2024-06-10', description: 'Presentation of final projects', participants: ['Eve', 'Frank'], location: 'Auditorium' }
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const selectEvent = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Events</h1>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
        <ul>
          {events.map(event => (
            <li key={event.id} className="mb-4 p-2 border rounded bg-gray-100 cursor-pointer" onClick={() => selectEvent(event)}>
              <div className="flex justify-between items-center">
                <span>{event.name} - {event.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedEvent && (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">{selectedEvent.name}</h2>
          <p><strong>Date:</strong> {selectedEvent.date}</p>
          <p><strong>Description:</strong> {selectedEvent.description}</p>
          <p><strong>Participants:</strong> {selectedEvent.participants.join(', ')}</p>
          <p><strong>Location:</strong> {selectedEvent.location}</p>
          <button onClick={() => setSelectedEvent(null)} className="mt-4 bg-blue-500 text-white p-2 rounded">Close</button>
        </div>
      )}
    </div>
  );
};

export default Events;
