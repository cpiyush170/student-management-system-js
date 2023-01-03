const express = require('express');
const router = express.Router();

// importing student model
const Student = require('../models/student')

// to create new student

router.get('/', (req, res) => {
  
  res.send('student routes')
  
})

module.exports = router;