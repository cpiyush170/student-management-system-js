// we need to store info about student, so create a schema

const mongoose = require('mongoose')

// creating schema for student
const studentSchema = new mongoose.Schema({
  name: String,
  class: String,
  roll_no: Number
})

// compiling the schema into model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;