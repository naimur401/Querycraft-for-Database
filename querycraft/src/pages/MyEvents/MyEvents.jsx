import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const MyEvents = () => {
    const { user } = useContext(AuthContext);
    const [myEvents, setMyEvents] = useState([]);

    const url = `http://localhost:5000/myevents?email=${user?.email}`;

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setMyEvents(data))
            .catch(error => console.error('Error fetching events:', error));
    }, [url]);

    const deleteEvent = (id) => {
        console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/myevents?email=${user?.email}&event_id=${id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount === true) {
                        Swal.fire(
                            'Deleted!',
                            'Your Event has been deleted.',
                            'success'
                        );
                        const remainingEvents = myEvents.filter(event => event.event_id !== id);
                        setMyEvents(remainingEvents);
                    }
                })
                .catch(error => console.error('Error deleting event:', error));
            }
        });
    };

    return (
        <div>
            <div className="overflow-x-auto w-11/12 mx-auto">
                <table className="table table-zebra">
                    {/* Table head */}
                    <thead>
                        <tr>
                            <th>Event ID</th>
                            <th>Event Name</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        myEvents.length>0 ?
                        myEvents.map((event,idx) => (
                            <tr key={idx}>
                                <td>{event.event_id}</td>
                                <td>{event.event_name}</td>
                                <td>{new Date(event.event_date).toLocaleDateString()}</td>
                                <td>{event.description}</td>
                                <td>
                                    <button 
                                        onClick={() => deleteEvent(event.event_id)} 
                                        className="bg-blue-600 text-white p-2 rounded-lg"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )): <p className="text-center w-full text-2xl text-blue-500 font-semibold">No Event</p>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyEvents;
