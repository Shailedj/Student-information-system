import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentNavbar from './student-nav';
import Cookies from 'js-cookie';
import { Table } from 'react-bootstrap';
import '../styles/styles.css';

function StudentMark() {
  const [studentDetails, setStudentDetails] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.post('/auth/fetch-student', { token });
        const user = res.data.user;
        setStudentDetails(user);
      } catch (error) {
        console.error('fetch data error', error);
      }
    };

    const getToken = Cookies.get('token');
    if (getToken) {
      setToken(getToken);
    }
    fetchStudent();
  }, [token]);

  return (<>

    <StudentNavbar />
    <div className='student-mark'>
      <h1>Semester Marks</h1>
      {studentDetails ? (
        <>
          <p>Registration Number: {studentDetails.regno}</p>
          <p>Username: {studentDetails.username}</p>

          {/* Display other details as needed */}
          {studentDetails.subjectMarks.length > 0 && (
            <Table striped bordered hover >
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Semester</th>
                  <th style={{ textAlign: "center" }}>Subject</th>
                  <th style={{ textAlign: "center" }}>Marks</th>
                </tr>
              </thead>
              <tbody>
                {studentDetails.subjectMarks.map((subjectMark, index) => (
                  <tr key={index}>
                    {/* Display semester only once for each unique semester */}
                    {index === 0 || studentDetails.subjectMarks[index - 1].semester !== subjectMark.semester ? (
                      <td style={{ textAlign: "center", padding: "40px" }} rowSpan={studentDetails.subjectMarks.filter(mark => mark.semester === subjectMark.semester).length}>
                        {subjectMark.semester}
                      </td>
                    ) : null}
                    <td style={{ textAlign: "center" }}>{subjectMark.subject}</td>
                    <td style={{ textAlign: "center" }}>{subjectMark.marks}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  </>
  );
}

export default StudentMark;
