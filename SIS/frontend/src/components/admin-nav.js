import React from 'react';
import Cookies from 'js-cookie';
import { Navbar, Nav } from 'react-bootstrap';
import {  NavLink, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const cookies = Object.keys(Cookies.get());
    cookies.forEach(cookieName => {
      Cookies.remove(cookieName);
    });
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/admindashboard" style={{ margin: '0 0 0 100px', fontWeight: 'bold', fontSize: 40 }}>
        Admin
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" style={{ margin: '0 0 0 20%' }}>
          <strong>
            <Nav.Link as={NavLink} to="/studentdetails" style={{ margin: '0 10px 0 10px' }} activeStyle={{ color: 'red' }}>
              Student details
            </Nav.Link>
          </strong>
          <strong>
            <Nav.Link as={NavLink} to="/adminticket" style={{ margin: '0 10px 0 10px' }} activeStyle={{ color: 'red' }}>
              Hall ticket
            </Nav.Link>
          </strong>
          <strong>
            <Nav.Link as={NavLink} to="/adminLeave" style={{ margin: '0 10px 0 10px' }} activeStyle={{ color: 'red' }}>
              Leave application
            </Nav.Link>
          </strong>
          <strong>
            <Nav.Link as={NavLink} to="/adminmark" style={{ margin: '0 10px 0 10px' }} activeStyle={{ color: 'red' }}>
              Semester Marks
            </Nav.Link>
          </strong>
        </Nav>
        <Nav className="ml-auto" style={{ padding: '0 30px 0 26%' }}>
          <strong>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </strong>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminNavbar;
