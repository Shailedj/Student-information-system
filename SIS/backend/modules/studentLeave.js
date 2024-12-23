const mongoose = require('mongoose');

const studentLeaveSchema = new mongoose.Schema({
  regno: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  fromDate: {
    type: Date,
    required: true
  },
  toDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    default: 'pending' // Set default status to 'pending'
  }
}, { timestamps: true });

const StudentLeave = mongoose.model('StudentLeave', studentLeaveSchema);

module.exports = StudentLeave;
