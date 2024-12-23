import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import StudentNavbar from './student-nav';
import axios from 'axios';
import Cookies from 'js-cookie';

const StudentLeaveForm = () => {
    const [reason, setReason] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [regno, setRegno] = useState('');
    const [username,setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchStudent = async() => {
            try{
                const token = Cookies.get("token");
                const res = await axios.post('/auth/fetch-student', {token});
                const userData = res.data.user;
                setRegno(userData.regno);
                setUsername(userData.username);
    
            }catch(error){
                console.error("fetch student error",error);
            }
        };
        fetchStudent();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                reason,
                fromDate,
                toDate,
                regno,
                username
            };
            console.log(formData)
            const response = await axios.post('/auth/student-leave', formData);
            console.log(response.data);
            alert('Leave application submitted successfully');
            // Clear form fields after submission
            setReason('');
            setFromDate('');
            setToDate('');
            setErrorMessage('');
        } catch (error) {
            console.error(error);
            setErrorMessage('Error submitting leave application');
        }
    };

    return (
        <>
        <StudentNavbar />
        <div className='leave-student'>
        <div style={{ border: 2, margin: '5% 30% 10% 30%', color: 'black' }}>
            <h1 className="text-center mt-4">Leave Application</h1>

            <Form className="mt-4" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formReason">
                    <Form.Label>Reason for Leave</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Enter reason for leave"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formFromDate">
                    <Form.Label>From Date</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Select start date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formToDate">
                    <Form.Label>To Date</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Select end date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        required
                    />
                </Form.Group>

                {errorMessage && <p className="text-danger">{errorMessage}</p>}

                <Button variant="primary" type="submit" style={{margin:"10px 0 0 0 "}}>
                    Submit
                </Button>
            </Form>
        </div>
        </div>
        </>
    );
};

export default StudentLeaveForm;
