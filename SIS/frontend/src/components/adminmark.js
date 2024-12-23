import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import AdminNavbar from './admin-nav';
import '../styles/styles.css';

function AdminMark() {
  const [formData, setFormData] = useState({
    regno: '',
    semester: '',
    subjectMarks: []
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddSubject = () => {
    setFormData({
      ...formData,
      subjectMarks: [...formData.subjectMarks, { subject: '', marks: '' }]
    });
  };

  const handleSubjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSubjectMarks = [...formData.subjectMarks];
    updatedSubjectMarks[index][name] = value;
    setFormData({
      ...formData,
      subjectMarks: updatedSubjectMarks
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/post-marks', formData);
      console.log('Marks posted successfully:', response.data);
      // Reset form data after successful submission if needed
      setFormData({
        regno: '',
        semester: '',
        subjectMarks: []
      });
    } catch (error) {
      console.error('Error posting marks:', error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className='mark-admin'>
      <Container className="mt-5">
        <h1 className="mb-5">Post Marks</h1>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="regno">
              <Form.Label>Register Number:</Form.Label>
              <Form.Control type="text" name="regno" value={formData.regno} className='label-mark' onChange={handleChange} required />
            </Form.Group>
            <Form.Group as={Col} controlId="semester">
              <Form.Label>Semester:</Form.Label>
              <Form.Control type="text" name="semester" value={formData.semester} className='label-mark' onChange={handleChange} required />
            </Form.Group>
          </Row>
          <h2>Subject Marks:</h2>
          {formData.subjectMarks.map((subject, index) => (
            <Row key={index} className="mb-3">
              <Form.Group as={Col} controlId={`subject${index}`}>
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text" name="subject" value={subject.subject} className='label-mark' onChange={(e) => handleSubjectChange(index, e)} required />
              </Form.Group>
              <Form.Group as={Col} controlId={`marks${index}`}>
                <Form.Label>Marks</Form.Label>
                <Form.Control type="text" name="marks" value={subject.marks} className='label-mark' onChange={(e) => handleSubjectChange(index, e)} required />
              </Form.Group>
            </Row>
          ))}
          <Button variant="primary" onClick={handleAddSubject} className="animated-button">
            Add Subject
          </Button>
          <Button type="submit" style={{margin:"1px 0 0 20px"}} className="animated-button">Submit</Button>
        </Form>
      </Container>
      
      </div>
    </>
  );
}

export default AdminMark;
