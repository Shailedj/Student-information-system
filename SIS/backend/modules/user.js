const mongoose = require('mongoose');

// Mongoose schema for Admin
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
});

const Admin = mongoose.model('Admin', adminSchema);


// Define the schema for students

const studentSchema = new mongoose.Schema({
    regno: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    DOB: {
        type: String,
        required: false,
    },
    mobileno: {
        type: Number,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        default: "not-verify",
    },
    hallticket:{
        type: Boolean,
        default: false
    },
    subjectMarks: [{
        semester: {
            type: String,
        },
        subject: {
            type: String,
        },
        marks: {
            type: Number,
        },
    }],
});

// Create a mongoose model using the schema
const Student = mongoose.model('Student', studentSchema);

module.exports = {
    Admin: Admin,
    Student: Student
};
