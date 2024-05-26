
// src/components/Notifications.js
import React, { useState } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Assignment 1 deadline approaching', read: false },
    { id: 2, message: 'New lecture available', read: true },
    { id: 3, message: 'Grade for Assignment 2 released', read: false }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: !notification.read } : notification
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Notifications</h1>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your Notifications</h2>
        <ul>
          {notifications.map(notification => (
            <li key={notification.id} className={`mb-4 p-2 border rounded ${notification.read ? 'bg-gray-200' : 'bg-gray-100'}`}>
              <div className="flex justify-between items-center">
                <span className={notification.read ? 'line-through' : ''}>{notification.message}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-blue-500"
                  >
                    {notification.read ? 'Unread' : 'Read'}
                  </button>
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;
