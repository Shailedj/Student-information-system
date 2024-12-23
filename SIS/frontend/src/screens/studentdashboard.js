import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import StudentNavbar from '../components/student-nav';
import { Card } from 'react-bootstrap';
import '../styles/styles.css';

function StudentDashboard(){

  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [regno, setRegno] = useState('');
  
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.post('/auth/fetch-student', { token });
        const user = res.data.user;
        setUsername(user.username);
        setRegno(user.regno);
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

  return (
    <>
      <div className="student-dash">
        <StudentNavbar />
        <Card className="text-center" style={{ width: '18rem', margin: '0 auto', marginTop: '50px', backgroundColor: 'transparent',border:"none" }}>
          <Card.Body>
            <Card.Text style={{fontFamily:"cursive",margin:"20px 0 0 0",padding:"0 0 20px 0"}}>
              Username: {username} <br /> <br />
              Registration Number: {regno}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default StudentDashboard;
