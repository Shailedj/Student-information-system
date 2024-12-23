import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const StudentRegistrationForm = () => {
    const [regno, setRegno] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [DOB, setDOB] = useState('');
    const [mobileno, setMobileno] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validation checks
            if (!regno.trim()) {
                throw new Error('Register Number is required');
            }
            if (!username.trim()) {
                throw new Error('Username is required');
            }
            if (!email.trim()) {
                throw new Error('Email is required');
            }
            if (!DOB) {
                throw new Error('Date of Birth is required');
            }
            if (!mobileno.trim()) {
                throw new Error('Mobile number is required');
            }
            if (!address.trim()) {
                throw new Error('Address is required');
            }
            if (!password.trim()) {
                throw new Error('Password is required');
            }

            // If all fields are filled, proceed with registration
            const response = await axios.post('/auth/student-register', {
                regno,
                username,
                email,
                DOB,
                mobileno,
                address,
                password,
                role: 'student',
            });

            console.log(response.data.user);
            navigate('/studentlogin');
            alert('Student registered successfully');

        } catch (error) {
            console.error(error);
            setErrorMessage(error.message || 'Error while registering student');
        }
    };

    return (
        <div className='reg-student'>
            <div style={{ margin: '5% 30% 10% 30%', color: 'black' }}>
                <Card className="text-center" style={{ backgroundColor: 'transparent', border: 'none' }}>
                    <Card.Body className='reg-student-form'>
                        <Form className="mt-4" onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formRegNo">
                                    <Form.Label>Register Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your Reg no"
                                        value={regno}
                                        onChange={(e) => setRegno(e.target.value)}
                                        required
                                        className="input-hover"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formUserName">
                                    <Form.Label>User name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your user name"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        className="input-hover"
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="input-hover"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formDOB">
                                    <Form.Label>DOB</Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="Enter your Date of Birth"
                                        value={DOB}
                                        onChange={(e) => setDOB(e.target.value)}
                                        required
                                        className="input-hover"
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formMobileNo">
                                    <Form.Label>Mobile number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your mobile number"
                                        value={mobileno}
                                        onChange={(e) => setMobileno(e.target.value)}
                                        required
                                        className="input-hover"
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formAddress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                        className="input-hover"
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="input-hover"
                                    />
                                </Form.Group>
                            </Row>

                            {errorMessage && <p className="text-danger">{errorMessage}</p>}

                            <Button variant="primary" type="submit" className='animated-button'>
                                Register
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default StudentRegistrationForm;
