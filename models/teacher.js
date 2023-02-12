const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const teacherSchema = new Schema({

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  subject: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Subject'
  },
  joined_at: {
    type: Date,
    default: Date.now
  }
})

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;