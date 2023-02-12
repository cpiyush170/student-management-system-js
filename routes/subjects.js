const express = require('express')
const router = express.Router()
const Subject = require('../models/subject')
const Teacher = require('../models/teacher')


// get all subjects
router.get('/', async(req, res) => {
  let searchQuery = {}
  if (req.query.name != null && req.query.name != ' ') {
    searchQuery.name = new RegExp(req.query.name, 'i')
  }
  try {
    const subjects = await Subject.find(searchQuery)
    
    res.render('subjects/index', {
      subjects: subjects,
      query: req.query
    })
  } catch {
    res.redirect('/')
  }
})

// get page for adding new subject
router.get('/new', (req, res) => {
  res.render('subjects/new')
})

// handle creation of new subject
router.post('/', async(req, res) => {

  try {
    let subject = new Subject({
      name: req.body.name,
    })
    await subject.save();
      res.redirect('/subjects')
  } catch {
    res.redirect('/subjects/new')
  }
})

// list teachers of a particular subject
router.get('/details/:id', async (req, res) => {
  // find subject by id parameter
  let subject = await Subject.findById(req.params.id)
  let teachersBySubject = await Teacher.find({ subject: subject.id });
  console.log(teachersBySubject)
  res.render('subjects/details', {
    teachers: teachersBySubject,
    subject
  })
  
})

// get edit page for editing a subject
router.get('/edit/:id', async (req, res) => {
  let subject = await Subject.findById(req.params.id)
  res.render('subjects/edit', { subject })
})


// handles update request for subject
router.put('/:id', async(req, res) => {
  let subject;
  try {
    subject = await Subject.findById(req.params.id);
    subject.name = req.body.name;
    await subject.save();
    res.redirect('/subjects')
  } catch {
    redirect('/')
  }
})


router.delete('/:id', async(req, res) => {
  let subject;
  try {
    subject = await Subject.findById(req.params.id);
    await subject.remove();
    res.json({redirect: '/subjects'})
    
  } catch {
    res.redirect('/')
  }
 })


module.exports = router;