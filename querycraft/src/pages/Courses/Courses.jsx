import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch('http://localhost:5000/courses')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  useEffect(() => {
    if (user?.email) {
      const url = `http://localhost:5000/my-courses?email=${user?.email}`;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setMyCourses(data);
          } else {
            console.error('Invalid data format for my-courses:', data);
          }
        })
        .catch(error => console.error('Error fetching my-courses:', error));
    }
  }, [user]);

  const enrollCourse = (course_id) => {
    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need to log in to enroll in a course!',
      });
      return;
    }

    if (myCourses.some(course => course.course_id === course_id)) {
      Swal.fire({
        icon: 'info',
        title: 'Info',
        text: 'You are already enrolled in this course!',
      });
      return;
    }

    const userCourse = {
      email: user.email,
      course_id
    };

    fetch('http://localhost:5000/enrollments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCourse),
    })
      .then(res => res.json())
      .then(data => {
        if (data.dataInserted) {
          Swal.fire({
            icon: 'success',
            title: 'Enrolled',
            text: 'You have successfully enrolled in the course!',
          });
          setMyCourses([...myCourses, { course_id }]);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was a problem enrolling in the course. Please try again later.',
          });
        }
      })
      .catch(error => console.error('Error enrolling in course:', error));
  };

  return (
    <div className='w-10/12 mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10'>
      {
        courses?.map(course => (
          <div key={course.course_id} className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Course Id: {course?.course_id}</h2>
              <h2 className="card-title">Course Code: {course?.course_code}</h2>
              <p className="text-xl"><span>Course Name: </span>{course?.title}</p>
              <p><span>Course Description: </span>{course?.description}</p>
              <p><span>Course prerequisites: </span>{course.prerequisites}</p>
            </div>
            <button onClick={() => enrollCourse(course?.course_id)} className='btn btn-outline m-4'>Enroll Now</button>
          </div>
        ))
      }
    </div>
  );
};

export default Courses;
