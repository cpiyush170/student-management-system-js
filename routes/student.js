const express = require('express');
const { findByIdAndDelete } = require('../models/student');
const router = express.Router();
// importing student model
const Student = require('../models/student')

// get all students details
router.get('/', async (req, res) => {
  let searchQuery = {}
  if (req.query.name != null && req.query.name != ' ') {
    searchQuery.name = new RegExp(req.query.name, 'i')
    console.log(searchQuery)
  }
  try {
    const students = await Student.find(searchQuery)
    res.render('students', {
      students: students,
      query: req.query
    },
    )
  } catch {
    res.redirect('/')
  }
  
})


// renders page for adding new student
router.get('/new', (req, res) => {
  res.render('new')
})

// route to add new student
router.post('/', async(req, res) => {
  let student = new Student({
    name: req.body.name,
    roll_no: req.body.rollNo,
    class: req.body.class,
    age: req.body.age,
    gender: req.body.gender,
    grade: req.body.grade
  })
  try {
    const rollNo = await Student.find({ roll_no: req.body.rollNo })
    if (rollNo === req.body.rollNo) {
      res.render('/new', {errorMessage: 'Roll No. cannot be same'})
    }
    else {
      await student.save()
      res.redirect(`/students`)
    }
  } catch {
    res.redirect('students/new')
  }
})

// get student by id
router.get('/details/:id', async(req, res) => {
  
  try {
    const student = await Student.findById(req.params.id)
    res.render('details', {student: student})
  } catch {
    // if error redirect user to homepage
    res.redirect('/')
  }
})


router.get('/edit/:id', async(req, res) => {
  
  try {
    const student = await Student.findById(req.params.id)
    res.render('edit', {student: student})
  } catch {
    // if error redirect user to homepage
    res.redirect('/')
  }
})

// handles update(edit) request
router.put('/:id', async(req, res) => {
  
  let student;
  let id = req.params.id;
  try {
      student = await Student.findById(id)
      student.name = req.body.name
      student.roll_no = req.body.rollNo
      student.class = req.body.class
      student.age = req.body.age
      student.gender = req.body.gender
      student.grade = req.body.grade
      await student.save()
      res.redirect('/students')
  } catch {
    if(student == null) res.redirect('/')
    else {
      res.render('edit', {
        student: student,
        errorMessage: 'Roll No already in use'
      })
    }
  }
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Student.findByIdAndDelete(id).then(() => {
    res.send('deleted')
  })
})
module.exports = router;