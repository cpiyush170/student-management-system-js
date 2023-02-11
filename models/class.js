const mongoose = require('mongoose')
const Student = require('./student')

const Schema = mongoose.Schema

const classSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

// this middleware function checks if students exists in that
// class that is being deleted, if that class has students it disallow you to delete that class, otherwise it will delete
classSchema.pre('remove', async function (next) {
  const Class = this;
  const students = await Student.find({ class: Class._id });
  if (students.length > 0) {
    next(new Error('Cannot delete class with students'));
  }
  else {
    next();
  }
})

const Class = mongoose.model('Class', classSchema)
module.exports = Class