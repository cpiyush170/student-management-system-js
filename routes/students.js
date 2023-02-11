const express = require('express');
const router = express.Router();
// importing models
const Student = require('../models/student')
const Class = require('../models/class')

// get all students details
router.get('/', async (req, res) => {
  let searchQuery = {}
  if (req.query.name != null && req.query.name != ' ') {
    searchQuery.name = new RegExp(req.query.name, 'i')
    //console.log(searchQuery)
  }
  try {
    let students = await Student.find(searchQuery)
      .populate('class')
      .exec();
    res.render('students/index', {
      students: students,
      query: req.query
    }
    )
  } catch {
    res.redirect('/')
  }
  
})


// renders page for adding new student
router.get('/new', async(req, res) => {
  let classes = await Class.find({})

  // passing classes to view for choosing from existing classes
  res.render('students/new', { classes: classes})
})

// route to add new student
router.post('/', async(req, res) => {
  
  try {
    let student = new Student({
      name: req.body.name,
      roll_no: req.body.rollNo,
      class: req.body.class,
      age: req.body.age,
      gender: req.body.gender,
      grade: req.body.grade
    })
      await student.save()
      res.redirect('/students')
  } catch {
    res.redirect('/students/new')
  }
})

// get student by id
router.get('/details/:id', async(req, res) => {
  
  try {
    const student = await Student.findById(req.params.id).populate('class').exec()
    res.render('students/details', {student: student})
  } catch {
    // if error redirect user to homepage
    res.redirect('/')
  }
})

// get edit page
router.get('/edit/:id', async(req, res) => {
  
  try {
    const student = await Student.findById(req.params.id)
    const classes = await Class.find({})
    res.render('students/edit', {student, classes})
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
      res.render('students/edit', {
        student: student,
        errorMessage: 'Roll No already in use'
      })
    }
  }
})

router.delete('/:id', async (req, res) => {
  
  Student.findByIdAndDelete(req.params.id).then(() => {
    res.send('deleted')
  })
  

})
module.exports = router;