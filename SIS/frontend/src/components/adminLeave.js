import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import AdminNavbar from './admin-nav';
import '../styles/styles.css';

function AdminLeaveForm() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get('/auth/leave-request');
        setLeaveRequests(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, []);

  const approveLeave = async (leaveRequestId) => {
    try {
      await axios.put(`/auth/leave-requests/${leaveRequestId}/approve`);
      setLeaveRequests(prevLeaveRequests =>
        prevLeaveRequests.map(request =>
          request._id === leaveRequestId ? { ...request, status: 'approved' } : request
        )
      );
    } catch (error) {
      console.error('Error approving leave:', error);
      setError('Error approving leave');
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className='leave-admin'>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <Alert variant="danger">Error: {error}</Alert>
        ) : (
          <Row className="mt-3">
            {leaveRequests.length > 0 ? (
              leaveRequests.map(request => (
                <Col key={request._id} xs={12} md={4} style={{ marginBottom: '20px' }}>
                  <Card style={{ border: "none" , backgroundColor: "transparent" }}>
                    <Card.Body style={{ border: "2px solid black", borderRadius: "20px" }}>
                      <Card.Text>
                        <strong>Student Name:</strong> {request.username} <br />
                        <strong>Reason:</strong> {request.reason} <br />
                        <strong>From:</strong> {request.fromDate} <br />
                        <strong>To:</strong> {request.toDate} <br />
                        {request.status === 'pending' && (
                          <Button variant="primary" className="animated-button" style={{ marginTop: "10px" }} onClick={() => approveLeave(request._id)}>Approve Leave</Button>
                        )}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <div className="col-12">No leave requests available</div>
            )}
          </Row>
        )}
      </div>
    </>
  );
}

export default AdminLeaveForm;
