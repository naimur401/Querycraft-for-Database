import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const MyEvents = () => {
    const { user } = useContext(AuthContext);
    const [myEvents, setMyEvents] = useState([]);
    console.log(myEvents);
    const url = `http://localhost:5000/my-events?email=${user?.email}`
    useEffect(()=>{
        fetch(url)
        .then(res => res.json())
        .then(data => setMyEvents(data))
    }, [url])

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
                fetch(`http://localhost:5000/my-events?email=${user?.email}&eventId=${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount === true) {
                            Swal.fire(
                                'Deleted!',
                                'Your Event has been deleted.',
                                'success'
                            )
                            const remaining = myEvents.filter(e => e.event_id !== id);
                            setMyEvents(remaining);
                        }
                    })
            }
        })
    }
    return (
        <div>
            <div className="overflow-x-auto w-11/12 mx-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Event ID</th>
                            <th>Event Name</th>
                            <th>Event Date</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            myEvents.map(e => <tr key={e.event_id}>
                                <th>{e?.event_id}</th>
                                <td>{e?.event_name}</td>
                                <td>{e?.event_date}</td>
                                <td>{e?.description}</td>
                                <td><button onClick={() => deleteEvent(e.event_id)} className="bg-blue-600 text-white p-2 rounded-lg">Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyEvents;
