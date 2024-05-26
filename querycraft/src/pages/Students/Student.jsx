import { useEffect, useState } from 'react';

const Student = () => {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/students')
      .then(res => res.json())
      .then(data => setStudents(data))
  }, [])

  console.log(students);
  return (
    <div className='w-7/12 mx-auto bg-[#f2f2f2] p-6 my-10'>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Contact</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              students.map(s => <tr key={s.student_id}>
                <th>{s.student_id}</th>
                <td>{s.name}</td>
                <td>{s.contact_number}</td>
                <td>{s.enrollment_status == 1 ? 'enrolled' : 'Not enroll' }</td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Student;