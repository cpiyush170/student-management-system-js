const express = require('express');
const router = express.Router();

// importing student model
const Student = require('../models/student')


router.get('/', async(req, res) => {
  // I want to show the data from db here
  let students;
  try{
    students = await Student.find().exec();
  }catch{
    students = [];
  }
  res.render('index', {students: students})
})

module.exports = router