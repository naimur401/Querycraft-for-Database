import { useState } from 'react';
import Swal from 'sweetalert2';
const AddStudent = () => {
    const [student, setStudent] = useState({
        student_id: '',
        name: '',
        contact_number: '',
        enrollment_status: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({
          ...student,
          [name]: value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(student);
        fetch('http://localhost:5000/student', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(student)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                Swal.fire({
                    title: "Good job!",
                    text: "Successfully created student",
                    icon: "success"
                  });
                // refetch()
            })
      };


    return (
        <div>
            <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
                <h2 className="text-xl font-bold mb-4">Add Student</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="student_id" className="block text-sm font-medium text-gray-700">Student ID</label>
                        <input
                            type="text"
                            id="student_id"
                            name="student_id"
                            value={student.student_id}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Student Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={student.name}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700">Contact Number</label>
                        <input
                            type="text"
                            id="contact_number"
                            name="contact_number"
                            value={student.contact_number}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="enrollment_status" className="block text-sm font-medium text-gray-700">Enrollment Status</label>
                        <select
                            id="enrollment_status"
                            name="enrollment_status"
                            value={student.enrollment_status}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="1">Enrolled</option>
                            <option value="0">Not Enrolled</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Add Student</button>
                </form>
            </div>
        </div>
    );
};

export default AddStudent;