import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './admin-nav';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/styles.css';

function AdminTicket() {
  const [students, setStudents] = useState([]);
  const [hallTickets, setHallTickets] = useState({});

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await axios.get('/auth/student-details');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const generateHallTicket = async (regno) => {
    try {
      const response = await axios.post(`/auth/statusHallticket`, { regno });
      console.log(response);
      // Update the hallTickets state to mark the hall ticket as generated for the specific student
      setHallTickets(prevHallTickets => ({
      //   ...prevHallTickets,
      //   [student._id]: response.data.hallTicket
      }));
      console.log('Hall ticket generated successfully!');
    } catch (error) {
      console.error(`Error generating hall ticket for student with registration number ${regno}:`, error);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className='admin-ticket'>
      <h1>Admin Hall Ticket</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Registration Number</th>
            <th>Username</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>{student.regno}</td>
              <td>{student.username}</td>
              <td>{student.status}</td>
              <td>
                <button className="btn btn-primary" onClick={() => generateHallTicket(student.regno)}>Generate Hall Ticket</button>
                {hallTickets[student._id] && (
                  <a href={hallTickets[student._id]} download className="btn btn-success ml-2">Download Hall Ticket</a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>);
}

export default AdminTicket;
