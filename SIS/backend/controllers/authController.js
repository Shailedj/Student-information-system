const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Admin, Student } = require('../modules/user');
const Mark = require('../modules/marks');
const StudentLeave = require('../modules/studentLeave');

// Admin register
exports.registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(name, email, password)
        const role = "admin"; // Assuming the role is predefined as 'admin'

        // Validate if username, email, and password are provided
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }

        // Check if an admin with the provided email already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'An admin with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin instance
        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword,
            role: 'admin' // Assuming the role is predefined as 'admin'
        });

        // Save the new admin to the database
        await newAdmin.save();
        // console.log(username,password);

        // Return a success message along with the token
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Admin login
exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Admin.findOne({ email });

        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            res.status(200).json({ message: 'Invalid password' });
            return;
        }

        if (email && comparePassword) {
            const token = jwt.sign({ email, role: user.role }, process.env.JWT_SECRET);
            return res.status(200).json({message:"admin login successfully", token, user });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server error' });
    }
};

// Student register
exports.registerStudent = async (req, res) => {
    try {
        const { regno, username, email, DOB, mobileno, address, password } = req.body;
        const role = "student";
        // const status = "not verify";
        const hallticket = false;
        if (!regno || !username || !email || !password || !role) {
            return res.status(400).json({ message: 'Username, password, regno, email, DOB, mobileno and address are required' });
        }

        // Check if an admin with the provided email already exists
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: 'An admin with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = new Student({
            regno,
            username,
            email,
            DOB,
            mobileno,
            address,
            password: hashedPassword,
            role: "student",
            hallticket,
        });
        // console.log(user);
        await newStudent.save();

        res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Student login
exports.studentLogin = async (req, res) => {
    try {
        const { regno, password } = req.body;
        const user = await Student.findOne({ regno });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(200).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ regno, role: user.role }, process.env.JWT_SECRET);
        return res.status(200).json({ token, user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server error' });
    }
};

// fetch student
exports.fetchStudent = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(401).json({ error: "JWT must be provided" });
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Student.findOne({ regno: verifyToken.regno });

        if (!user) {
            return res.status(404).json({ error: 'No user found' });
        }

        return res.status(200).json({ message: "User fetch successfull", user });
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Internal server error" });
    }
}
//halticket change true or false
exports.statusHallTicket = async (req, res) => {
    try {
        // Extract regno from the request body
        const { regno } = req.body;
        // console.log(regno)
        // Find the student with the provided registration number
        const student = await Student.findOne({ regno });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Update the hallticket field to true for the found student
        await Student.updateOne({ regno }, { hallticket: true });

        res.status(200).json({ message: 'Hall ticket generated successfully' });
    } catch (error) {
        console.error('Error generating hall ticket:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// fetch admin
exports.fetchAdmin = async (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(401).json({ error: "JWT must be provided" });
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Admin.findOne({ email: verifyToken.email });
        console.log(user);

        if (!user) {
            return res.status(404).json({ error: 'No admin found' });
        }

        return res.status(200).json({ message: "admin fetch successfull", user });
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Route to fetch student details
exports.StudentDetails = async (req, res) => {
    try {
        // Fetch all students from the database
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching student details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Students details verify route
exports.StudentDetailsverify = async (req, res) => {
    const studentId = req.params.id;
    const { status } = req.body; // Changed verified to status
    try {
        // Update the student's verification status
        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            { status },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.json(updatedStudent); // Send back the updated student
    } catch (error) {
        console.error('Error verifying student:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Example implementation of editStudent controller function
exports.editStudent = async (req, res) => {
    const { id } = req.params;
    const newData = req.body; // New data to update

    try {
        // Assuming you have a Student model
        const student = await Student.findByIdAndUpdate(id, newData, { new: true });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(student);
    } catch (error) {
        console.error('Error editing student:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Endpoint for posting marks
exports.postMarks = async (req, res) => {
    try {
        const { regno, semester, subjectMarks } = req.body;

        // Find student by regno
        const student = await Student.findOne({ regno });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Add semester to each subjectMark
        const markedSubjects = subjectMarks.map(subject => ({
            ...subject,
            semester: semester
        }));

        // Add markedSubjects to the student's subjectMarks array
        student.subjectMarks.push(...markedSubjects);

        // Save the updated student
        await student.save();

        res.status(201).json(student);
    } catch (error) {
        console.error('Error posting marks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getStudentMarks = async (req, res) => {
    try {
        // Extract regno from query parameters
        const { regno } = req.query;

        // Find the student in the database based on the registration number
        const student = await Student.findOne({ regno });
        console.log(student)
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }


        res.status(200).json(student);
    } catch (error) {
        console.error('Error fetching marks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Apply leave for students Controller
exports.applyForLeave = async (req, res) => {
    try {
        // Extract data from request body
        const { reason, fromDate, toDate, regno, username } = req.body;

        // Create a new student leave object
        const leaveApplication = new StudentLeave({
            regno, // Use the regno provided in the request body
            reason,
            fromDate,
            toDate,
            username
        });

        // Save the leave application to the database
        await leaveApplication.save();

        // Send a success response
        res.status(201).json({ message: 'Leave application submitted successfully', leaveApplication });
    } catch (error) {
        console.error('Error submitting leave application:', error);
        // Send an error response
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Fetch leave-request route controller
exports.leaveRequest = async (req, res) => {
    try {
        // Fetch all leave requests from the database
        const leaveRequests = await StudentLeave.find();

        // Send the leave requests as a response
        res.status(200).json(leaveRequests);
    } catch (error) {
        console.error('Error fetching leave requests:', error);
        // Send an error response
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Route to approve leave request
exports.approveLeave = async (req, res) => {
    try {
        const leaveRequestId = req.params.id;

        // Find the leave request by ID
        const leaveRequest = await StudentLeave.findById(leaveRequestId);

        // If the leave request is not found, return 404 Not Found
        if (!leaveRequest) {
            return res.status(404).json({ error: 'Leave request not found' });
        }

        // Update the leave request status to "approved"
        leaveRequest.status = 'approved';

        // Save the updated leave request
        await leaveRequest.save();

        // Send a success response
        res.status(200).json({ message: 'Leave request approved successfully', leaveRequest });
    } catch (error) {
        console.error('Error approving leave request:', error);
        // Send an error response
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.generateHallTicket = async (req, res) => {
    // Here, you would typically generate the hall ticket, save it, and update the database
    // For this example, we're just updating the dummy student data
    const { token } = req.body;
    const studentIndex = students.findIndex(student => student.id === '1');
    if (studentIndex === -1) {
      return res.status(404).json({ error: 'Student not found' });
    }
    students[studentIndex].hallTicketGenerated = true;
    res.json({ message: 'Hall ticket generated successfully' });
  };

// Controller function to generate hall ticket
exports.getStudentHallTicket = async (req, res) => {
    try {
        // Extract student ID from query parameters
        const { studentId } = req.query;

        // Find the student in the database based on the student ID
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Here you can construct the hall ticket URL and fetch subjects, regno, and name
        // For demonstration purposes, let's assume subjects are stored in the student object

        const hallTicketURL = constructHallTicketURL(student); // Implement this function to construct hall ticket URL
        const { subjects, regno, name } = student;

        // Return the hall ticket URL along with other student information
        res.status(200).json({ hallTicketURL, subjects, regno, name });
    } catch (error) {
        console.error('Error fetching hall ticket:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
