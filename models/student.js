// we need to store info about student, so create a schema
const mongoose = require('mongoose')

// creating schema for student
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  roll_no: {
    type: Number,
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Class'
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  grade: String
})

// compiling the schema into model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;