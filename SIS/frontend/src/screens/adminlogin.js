import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const loginAdmin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/admin-login', { email, password });
            const { token, user } = response.data;
            if (user.role === 'admin') {
                // Set JWT token in cookie
                Cookies.set('token', token, { expires: 1 * 24 * 60 });
                toast.success('Admin login successful'); // Show success toast
                navigate('/admindashboard');
            } else {
                setErrorMessage('Unauthorized'); // Set error message if user is not admin
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message); // Set error message received from the server
            } else {
                setErrorMessage('Error while logging in'); // Set generic error message
            }
        }
    };

    const redirectToRegister = () => {
        navigate('/adminregister');
    };

    return (
        <div className="log-admin">
            <div style={{ margin: '5% 30% 10% 30%', color: 'black' }}>
                <Card className="text-center" style={{ backgroundColor: 'transparent', border: 'none' }}>
                    <Card.Body className='log-admin-form'>
                        <Form className="mt-4" onSubmit={loginAdmin}>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                Register New Admin
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
            <ToastContainer /> {/* Toast container for displaying messages */}
        </div>
    );
};

export default AdminLogin;
