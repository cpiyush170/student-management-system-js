const mongoose = require('mongoose');
const Teacher = require('./teacher')

const Schema = mongoose.Schema

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
})


subjectSchema.pre('remove', async function (next) {

  let teachers = await Teacher.find({ subject: this.Subject.id })
  if (teachers.length > 0) {
    next(new Error('Cannot delete subject with teachers'))
  }
  else {
    next();
  }
})

const Subject = mongoose.model('Subject', subjectSchema)
module.exports = Subject;