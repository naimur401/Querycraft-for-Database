import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const Notifications = () => {
    const { user } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const url = `http://localhost:5000/notifications?userId=${user?.id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setNotifications(data))
            .catch(error => console.error('Error fetching notifications:', error));
    }, [user]);

    const markAsRead = (notification_id) => {
        const url = `http://localhost:5000/notifications/${notification_id}`;
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'read' })
        })
            .then(res => res.json())
            .then(data => {
                if (data.updated) {
                    setNotifications(notifications.map(notification => 
                        notification.notification_id === notification_id ? { ...notification, status: 'read' } : notification
                    ));
                    Swal.fire({
                        icon: 'success',
                        title: 'Notification marked as read',
                        timer: 1500
                    });
                }
            })
            .catch(error => console.error('Error updating notification:', error));
    };

    const deleteNotification = (notification_id) => {
        const url = `http://localhost:5000/notifications/${notification_id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deleted) {
                    setNotifications(notifications.filter(notification => notification.notification_id !== notification_id));
                    Swal.fire({
                        icon: 'success',
                        title: 'Notification deleted',
                        timer: 1500
                    });
                }
            })
            .catch(error => console.error('Error deleting notification:', error));
    };

    return (
        <div className="w-10/12 mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Notifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {notifications.map(notification => (
                    <div key={notification.notification_id} className={`p-4 border rounded-lg ${notification.status === 'unread' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        <p>{notification.message}</p>
                        <p className="text-sm text-gray-500">{new Date(notification.timestamp).toLocaleString()}</p>
                        {notification.status === 'unread' && (
                            <button onClick={() => markAsRead(notification.notification_id)} className="mt-2 bg-blue-400 text-white px-1 py-1 mr-1 rounded-xl">Mark as Read</button>
                        )}
                        <button onClick={() => deleteNotification(notification.notification_id)} className="mt-2 bg bg-red-500 text-white px-1 py-1 rounded-xl">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;