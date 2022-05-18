import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { useParams } from "react-router-dom";
function ViewFaculty(props) {


    const [loading, setLoading] = useState(true);
    const [faculty, setStudents] = useState([]);

    useEffect(() => {

        axios.get(`/api/pendingstudent`).then(res => {
            if (res.status === 200) {
                setStudents(res.data.pending)
                setLoading(false);
            }
        });

    }, []);


    const update = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        console.log(id);
        const data = {
            status: "accepted",

        }

        axios.put(`/api/updating/${id}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success!", res.data.message, "success")
                console.log("test");
                thisClicked.closest("tr").remove();

            }

        });
    }
    const deleteStudent = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-students/${id}`).then(res => {
            if (res.data.status === 200) {
                swal(
                    'Good job!',
                    'Request Accepted!',
                    'success'
                )
                thisClicked.closest("tr").remove();
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                thisClicked.innerText = "Delete";
            }
        });
    }

    if (loading) {
        return <h4>Loading Student List Data...</h4>
    }
    else {
        var faculty_HTMLTABLE = "";

        faculty_HTMLTABLE = faculty.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.student_id}</td>
                    <td>{item.subject_code}</td>
                    <td>{item.semester}</td>
                    <td>{item.school_year}</td>
                    <td>{item.status}</td>

                    <td className='text-center'>
                        <button onClick={(e) => update(e, item.id)} className="btn btn-success btn-sm">Confirm</button>
                        &nbsp;&nbsp;&nbsp;
                        <button type="button" onClick={(e) => deleteStudent(e, item.id)} className="btn btn-danger btn-sm">Decline</button>
                    </td>
                </tr>
            );
        });
    }

    return (
        <div>
            <br />
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">

                                <h4>Requested Form Data

                                </h4>
                            </div>
                            <div className="card-body">

                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Student ID</th>
                                            <th>Subject Code</th>
                                            <th>Semester/Trimester/Summer</th>
                                            <th>School Year</th>
                                            <th>Actions</th>
                                            <th className='text-center'>Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {faculty_HTMLTABLE}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ViewFaculty;