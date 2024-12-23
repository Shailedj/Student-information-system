// Assuming you have Mongoose installed and set up
const mongoose = require('mongoose');

// Define the schema for the Mark object
const markSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  subjectMarks: [{
    subject: {
      type: String,
      required: true
    },
    marks: {
      type: Number,
      required: true
    }
  }]
});

// Create the Mark model using the schema
const Mark = mongoose.model('Mark', markSchema);

module.exports = Mark;
