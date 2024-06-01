import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const MyCourses = () => {
    const { user } = useContext(AuthContext);
    const [myCourses, setMyCourses] = useState([]);
    console.log(myCourses);
    const url = `http://localhost:5000/my-courses?email=${user?.email}`
    useEffect(()=>{
        fetch(url)
        .then(res => res.json())
        .then(data => setMyCourses(data))
    }, [url])

    const deleteCourse = (id) => {
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
                fetch(`http://localhost:5000/enrollments?email=${user?.email}&courseId=${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount == true) {
                            Swal.fire(
                                'Deleted!',
                                'Your Course has been deleted.',
                                'success'
                            )
                            const remaining = myCourses.filter(c => c.course_id !== id);
                            setMyCourses(remaining);
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
                            <th>Course ID</th>
                            <th>Course Code</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Prerequisites</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            myCourses.length>0 ?
                            myCourses?.map(c => <tr key={c?.course_id}>
                                <th>{c?.course_id}</th>
                                <td>{c?.course_code}</td>
                                <td>{c?.title}</td>
                                <td>{c?.description}</td>
                                <td>{c?.prerequisites}</td>
                                <td><button onClick={()=>deleteCourse(c?.course_id)} className="bg-blue-600 text-white p-2 rounded-lg">Delete</button></td>
                            </tr>): <p>No courses selected</p>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyCourses;