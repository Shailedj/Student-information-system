import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Table } from 'react-bootstrap';
import StudentNavbar from '../components/student-nav';

function MyDetails(){

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

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <StudentNavbar />
    <div className='student-mydetails'>
    
      {userDetails.status === 'Verified' ? (
        <div className="container">
          <Table striped bordered hover style={{margin:"10px 0 0 0"}}>
            <tbody>
              <tr>
                <td><strong>Username</strong></td>
                <td>{userDetails.username}</td>
              </tr>
              <tr>
                <td><strong>Register Number</strong></td>
                <td>{userDetails.regno}</td>
              </tr>
              <tr>
                <td><strong>Email</strong></td>
                <td>{userDetails.email}</td>
              </tr>
              <tr>
                <td><strong>Date of Birth</strong></td>
                <td>{userDetails.DOB}</td>
              </tr>
              <tr>
                <td><strong>Mobile Number</strong></td>
                <td>{userDetails.mobileno}</td>
              </tr>
              <tr>
                <td><strong>Address</strong></td>
                <td>{userDetails.address}</td>
              </tr>
              <tr>
                <td><strong>Status</strong></td>
                <td>{userDetails.status}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      ) : (
        <h2 style={{textAlign: 'center'}}>Your account is not verified. Please wait for verification.</h2>
      )}
      </div>
    </>
  );
};

export default MyDetails;
