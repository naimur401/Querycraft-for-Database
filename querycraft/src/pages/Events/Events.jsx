import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch('http://localhost:5000/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/myevents?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setMyEvents(data);
          } else {
            console.error('Error: my-events is not an array', data);
            setMyEvents([]);
          }
        })
        .catch(error => {
          console.error('Error fetching my-events:', error);
          setMyEvents([]);
        });
    }
  }, [user]);

  const joinEvent = (event_id, event_name, event_date, description) => {
    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need to log in to join an event!',
      });
      return;
    }

    if (Array.isArray(myEvents) && myEvents.some(event => event.event_id === event_id)) {
      Swal.fire({
        icon: 'info',
        title: 'Info',
        text: 'You have already joined this event!',
      });
      return;
    }

    const userEvent = {
      email: user.email,
      event_id,
      event_name,
      event_date: new Date(event_date).toISOString().slice(0, 10),
      description,
    };

    fetch('http://localhost:5000/myevents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userEvent),
    })
      .then(res => res.json())
      .then(data => {
        if (data.dataInserted) {
          Swal.fire({
            icon: 'success',
            title: 'Joined',
            text: 'You have successfully joined the event!',
          });
          setMyEvents([...myEvents, { event_id }]);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was a problem joining the event. Please try again later.',
          });
        }
      })
      .catch(error => console.error('Error joining event:', error));
  };

  return (
    <div className='w-10/12 mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10'>
      {events?.map(event => (
        <div key={event.event_id} className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Event Id: {event?.event_id}</h2>
            <h2 className="card-title">Event Name: {event?.event_name}</h2>
            <p className="text-xl"><span>Date: </span>{new Date(event.event_date).toLocaleDateString()}</p>
            <p><span>Description: </span>{event?.description}</p>
          </div>
          <button
            onClick={() => joinEvent(event?.event_id, event?.event_name, event?.event_date, event?.description)}
            className='btn btn-outline m-4'
          >
            Join Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default Events;