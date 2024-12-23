import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const StudentLogin = () => {
    const [regno, setRegno] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const loginStudent = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/student-login', { regno, password });
            const { token, user } = response.data;
            if (user.role === 'student') {
                Cookies.set('token', token, { expires: 1 * 24 * 60 }); // Set JWT token in cookie
                alert('Student login successful');
                navigate('/studentdashboard');
            } else {
                setErrorMessage('Unauthorized'); // Set error message if user is not student
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message); // Set error message received from the server
            } else {
                setErrorMessage('Incorrect credentials'); // Set generic error message
            }
        }
    };

    const redirectToRegister = () => {
        navigate('/studentregister');
    };

    return (
        <div className="log-student">
            <div style={{ margin: '5% 30% 10% 30%', color: 'black' }}>
                <Card className="text-center" style={{ backgroundColor: 'transparent', border: 'none' }}>
                    <Card.Body className='log-student-form'>
                        <Form className="mt-4" onSubmit={loginStudent}>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Register number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Register number"
                                    value={regno}
                                    onChange={(e) => setRegno(e.target.value)}
                                    required
                                    className="input-hover"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="input-hover"
                                />
                            </Form.Group>

                            {errorMessage && <p className="text-danger">{errorMessage}</p>}

                            <Button type="submit" className="animated-button">
                                Login
                            </Button>

                            <Button onClick={redirectToRegister} className='animated-button' style={{ marginLeft: '10px' }}>
                                Register New Student
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default StudentLogin;
