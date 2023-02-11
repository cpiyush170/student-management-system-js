const express = require('express')
const router = express.Router()
const Class = require('../models/class')
const Student = require('../models/student')

// get all classes details
router.get('/', async(req, res) => {
  let searchQuery = {}
  if (req.query.name != null && req.query.name != ' ') {
    searchQuery.name = new RegExp(req.query.name, 'i')
  }
  try {
    const classes = await Class.find(searchQuery)
    
    res.render('classes/index', {
      classes: classes,
      query: req.query
    })
  } catch {
    res.redirect('/')
  }
  
})

// renders page for adding new class
router.get('/new', (req, res) => {
  res.render('classes/new')
})

// route to add new class
router.post('/', async(req, res) => {

  try {
    let newClass = new Class({
      name: req.body.name,
    })
    await newClass.save();
      res.redirect('/classes')
  } catch {
    res.redirect('/classes/new')
  }
})

// list students of particular class
router.get('/details/:id', async (req, res) => {
  let aClass = await Class.findById(req.params.id)
  let studentByClass = await Student.find({ class: aClass.id })
  res.render('classes/details', {
    students: studentByClass,
    aClass
  })
  
})

// get edit page for editing a class
router.get('/edit/:id', async (req, res) => {
  let aClass = await Class.findById(req.params.id)
  res.render('classes/edit', { aClass })
})

// handles update(edit) request for class
router.put('/:id', async(req, res) => {
  let aClass;
  try {
    aClass = await Class.findById(req.params.id);
    aClass.name = req.body.name;
    await aClass.save();
    res.redirect('/classes')
  } catch {
    redirect('/')
  }
  
})

// route for deleting a particular class
router.delete('/:id', async(req, res) => {
  let aClass;
  try {
    aClass = await Class.findById(req.params.id);
    await aClass.remove();
    res.json({redirect: '/classes'})
    
  } catch {
    res.redirect('/')
  }
 })



module.exports = router;