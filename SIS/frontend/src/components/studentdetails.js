import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Form } from 'react-bootstrap';
import AdminNavbar from './admin-nav';

const Studentdetails = () => {
  const [students, setStudents] = useState([]);

  const fetchStudentData = async () => {
    try {
      const response = await axios.get('/auth/student-details');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  const handleVerify = async (id) => {
    try {
      await axios.put(`/auth/student-verified/${id}`, { status: 'Verified' });
      fetchStudentData();
    } catch (error) {
      console.error('Error verifying student:', error);
    }
  };

  const handleEdit = (id) => {
    // Toggle edit mode for the specific student
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student._id === id ? { ...student, editMode: true } : student
      )
    );
  };

  const handleSave = async (id) => {
    const editedStudent = students.find((student) => student._id === id);

    try {
      await axios.put(`/auth/edit-student/${id}`, editedStudent);
      // After successfully saving, disable edit mode for the student
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === id ? { ...student, editMode: false } : student
        )
      );
    } catch (error) {
      console.error('Error saving student details:', error);
    }
  };

  return (
    <>
        <AdminNavbar />
    <div className='student-details'>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Reg no</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date of birth</th>
            <th>Mobile no</th>
            <th>Address</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <React.Fragment key={student._id}>
              <tr>
                <td>{student.regno}</td>
                <td>{student.username}</td>
                <td>{student.email}</td>
                <td>{student.DOB}</td>
                <td>{student.mobileno}</td>
                <td>{student.address}</td>
                <td>{student.status}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleVerify(student._id)}
                    style={{ marginRight: '5px' }}
                    disabled={student.verified}
                  >
                    Verify
                  </Button>
                  <Button
                    variant="info"
                    onClick={() => handleEdit(student._id)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
              <div style={{ padding: "0 0 0 200%", margin: "10px -100px 10px 10px", borderColor: "Background" }}>
                {student.editMode && (
                  <tr>
                    <td colSpan="7">
                      <Form.Control
                        style={{ padding: "10px 30px 10px 10px", margin: "0 10px 5px 20px" }}
                         type="text"
                        defaultValue={student.regno}
                        onChange={(e) =>
                          setStudents((prevStudents) =>
                            prevStudents.map((prevStudent) =>
                              prevStudent._id === student._id
                                ? { ...prevStudent, regno: e.target.value }
                                : prevStudent
                            )
                          )
                        }
                      />

                      <Form.Control
                     style={{ padding: "10px 30px 10px 10px", margin: "0 10px 5px 20px" }}
                        type="text"
                        defaultValue={student.username}
                        onChange={(e) =>
                          setStudents((prevStudents) =>
                            prevStudents.map((prevStudent) =>
                              prevStudent._id === student._id
                                ? { ...prevStudent, username: e.target.value }
                                : prevStudent
                            )
                          )
                        }
                      />

                      <Form.Control
                        style={{ padding: "10px 30px 10px 10px", margin: "0 10px 5px 20px" }}
                         type="email"
                        defaultValue={student.email}
                        onChange={(e) =>
                          setStudents((prevStudents) =>
                            prevStudents.map((prevStudent) =>
                              prevStudent._id === student._id
                                ? { ...prevStudent, email: e.target.value }
                                : prevStudent
                            )
                          )
                        }
                      />

                      <Form.Control
                        style={{ padding: "10px 30px 10px 10px", margin: "0 10px 5px 20px" }}
                         type="Date"
                        defaultValue={student.DOB}
                        onChange={(e) =>
                          setStudents((prevStudents) =>
                            prevStudents.map((prevStudent) =>
                              prevStudent._id === student._id
                                ? { ...prevStudent, DOB: e.target.value }
                                : prevStudent
                            )
                          )
                        }
                      />

                      <Form.Control
                      style={{ padding: "10px 30px 10px 10px", margin: "0 10px 5px 20px" }}
                        type="number"
                        defaultValue={student.mobileno}
                        onChange={(e) =>
                          setStudents((prevStudents) =>
                            prevStudents.map((prevStudent) =>
                              prevStudent._id === student._id
                                ? { ...prevStudent, mobileno: e.target.value }
                                : prevStudent
                            )
                          )
                        }
                      />

                      <Form.Control
                      style={{ padding: "10px 30px 10px 10px", margin: "0 10px 5px 20px" }}
                        type="text"
                        defaultValue={student.address}
                        onChange={(e) =>
                          setStudents((prevStudents) =>
                            prevStudents.map((prevStudent) =>
                              prevStudent._id === student._id
                                ? { ...prevStudent, address: e.target.value }
                                : prevStudent
                            )
                          )
                        }
                      />


                    </td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleSave(student._id)}
                        style={{ position: "absolute", margin:"0 0 0 37%" }}
                      >
                        Save
                      </Button>
                    </td>
                  </tr>
                )}
              </div>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
      </div>
    </>
  );
};

export default Studentdetails;
