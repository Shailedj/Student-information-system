import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button } from 'react-bootstrap';
import StudentNavbar from '../components/student-nav';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../styles/styles.css';

function StudentTickets() {
  const [token, setToken] = useState('');
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.post('/auth/fetch-student', { token });
        const user = res.data.user;
        setUserDetails(user);
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

  const generatePDF = () => {
    if (!userDetails) return;
    const doc = new jsPDF();
    
    // Photo frame rectangle border
    doc.setLineWidth(0.5);
    doc.rect(160, 10, 40, 40); // Adjust dimensions and position as needed
    
    // Student details
    doc.setFontSize(12);
    doc.text(`Registration Number: ${userDetails.regno}`, 10, 30);
    doc.text(`Name: ${userDetails.username}`, 10, 40);
    
    // Hall Ticket title
    doc.setFontSize(14);
    doc.text('Hall Ticket', 105, 20, null, null, 'center');
    
    // Subject marks table
    const data = userDetails.subjectMarks.map(mark => [mark.subject]); // Removed empty strings for the three columns
    doc.autoTable({
      startY: 60, // Adjust startY value as per your layout
      head: [['Subject']], // Subject heading
      body: data, // Subject marks data
    });
    
    // Investigator signature
    doc.text('Investigator Signature:', 10, doc.lastAutoTable.finalY + 10); // Adjust Y position based on the last table's finalY
    doc.line(10, doc.lastAutoTable.finalY + 15, 80, doc.lastAutoTable.finalY + 15); // Adjust Y position based on the last table's finalY
    
    // HOD signature
    doc.text('HOD Signature:', 100, doc.lastAutoTable.finalY + 10); // Adjust Y position based on the last table's finalY
    doc.line(100, doc.lastAutoTable.finalY + 15, 180, doc.lastAutoTable.finalY + 15); // Adjust Y position based on the last table's finalY
    
    // Student signature
    doc.text('Student Signature:', 10, doc.lastAutoTable.finalY + 30); // Adjust Y position based on the last table's finalY
    doc.line(10, doc.lastAutoTable.finalY + 35, 80, doc.lastAutoTable.finalY + 35); // Adjust Y position based on the last table's finalY
    
    doc.save('student_hall_ticket.pdf');
  };


  if (!userDetails) {
    return <div>Loading...</div>;
  }

  // Conditionally render hall ticket details and download PDF button
  const showHallTicket = userDetails.hallticket;

  return (
    <>
      <StudentNavbar />
      <div>
      {showHallTicket ? (
        <div style={{ display: 'flex', justifyContent: 'center', border: '1px solid black', padding: '20px', maxWidth: '600px' }}>
          <div style={{ textAlign: 'left', marginRight: '50px' }}>
            <h2>Hall Ticket</h2>
            <p>Registration Number: {userDetails.regno}</p>
            <p>Name: {userDetails.username}</p>
            <h3>Subject Marks:</h3>
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                </tr>
              </thead>
              <tbody>
                {userDetails.subjectMarks.map(mark => (
                  <tr key={mark.subject}>
                    <td>{mark.subject}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: '20px' }}>
              <p>Investigator Signature: ____________________________________</p>
              <p>HOD Signature: ____________________________________________</p>
              <p>Student Signature: _________________________________________</p>
            </div>
          </div>
          <div style={{ border: '1px solid black', width: '200px', height: '200px' }}>
            {/* Photo frame rectangle border */}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h3>Hall Ticket Not Published</h3>
        </div>
      )}
      {showHallTicket && <Button variant="primary" className='animated-button' onClick={generatePDF}>Download PDF</Button>}
      </div>
    </>
  );
}

export default StudentTickets;
