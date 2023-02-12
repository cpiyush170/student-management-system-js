const express = require("express");
const router = express.Router();
const Teacher = require("../models/teacher");
const Subject = require("../models/subject");

// get all teachers
router.get("/", async (req, res) => {
  let searchQuery = {};

  if (req.query.name != null && req.query.name != " ") {
    searchQuery.firstName = new RegExp(req.query.name, "i");
    //console.log(searchQuery)
  }

  try {
    let teachers = await Teacher.find(searchQuery);
    res.render("teachers/index", {
      teachers: teachers,
      query: req.query,
    });
  } catch {
    res.redirect("/");
  }
});

// renders page for adding new teacher
router.get("/new", async (req, res) => {
  let subjects = await Subject.find({});
  res.render("teachers/new", { subjects });
});

// route to add new teacher
router.post("/", async (req, res) => {
  try {
    let teacher = new Teacher({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age,
      gender: req.body.gender,
      salary: req.body.salary,
      subject: req.body.subject,
    });
    await teacher.save();
    res.redirect("/teachers");
  } catch {
    res.redirect("/teachers/new");
  }
});

// get teacher by id
router.get("/details/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate("subject")
      .exec();
    res.render("teachers/details", { teacher });
  } catch {
    // if error redirect user to homepage
    res.redirect("/");
  }
});

// get edit page for editing teacher
router.get("/edit/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    const subjects = await Subject.find({});
    res.render("teachers/edit", { teacher, subjects });
  } catch {
    // if error redirect user to homepage
    res.redirect("/");
  }
});

router.put("/:id", async (req, res) => {
  let teacher;
  let id = req.params.id;
  try {
    teacher = await Teacher.findById(id);
    teacher.firstName = req.body.firstName;
    teacher.lastName = req.body.lastName;
    teacher.email = req.body.email;
    teacher.age = req.body.age;
    teacher.gender = req.body.gender;
    teacher.salary = req.body.salary;

    await teacher.save();
    res.redirect("/teachers");
  } catch {
    if (teacher == null) res.redirect("/");
    else {
      res.render("teachers/edit", {
        teacher,
        errorMessage: "Error udpating teacher",
      });
    }
  }
});

// delete a particular teacher i.e by id
router.delete("/:id", async (req, res) => {
  Teacher.findByIdAndDelete(req.params.id).then(() => {
    res.send("deleted");
  });
});

module.exports = router;
