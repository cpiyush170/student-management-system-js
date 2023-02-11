const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const methodOverride = require('method-override')
const expressLayouts = require("express-ejs-layouts");
const app = express();
require('dotenv').config()


// specifying port for our application
const port = process.env.PORT || 4000;

// importing the routes
const indexRoute = require("./routes/index");
const studentRoutes = require("./routes/students");
const classesRoutes = require("./routes/classes")
const teachersRoutes = require("./routes/teachers")
const subjectsRoutes = require("./routes/subjects")

// view engine configuration
// setting ejs as our view engine
app.set("view engine", "ejs");
// setting view directory location for app
// where __dirname represents current directory in which
// script is being executed
app.set("views", path.join(__dirname, "views"));
//setting main as our default layout for app
app.set("layout", "layouts/main");

// middlewares
// adding expresslayout middleware
app.use(expressLayouts);
// to serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev")); // for logging dev info
app.use(methodOverride('_method')); // for method overridng
app.use(bodyParser.json()); // for parsing body 
app.use(bodyParser.urlencoded({ extended: false })); 
// importing mongoose library
const mongoose = require("mongoose");


// uri for our mongodb atlas cluster coming from env
let uri = process.env.MONGODB_URI
// to remove warning
mongoose.set("strictQuery", false);
// mongoose.connect(uri, options): it returns promise
mongoose
  .connect(uri, { dbName: "student_db" })
  .then(() => {
    console.log("database connection successful");
  })
  .catch((err) => {
    console.log("err connecting db due to: ", err);
  });

// for homepage, use this router
app.use("/", indexRoute);
// for students routes forward request to /students
app.use("/students", studentRoutes);
app.use("/classes", classesRoutes);
app.use("/teachers", teachersRoutes);
app.use("/subjects", subjectsRoutes);

app.listen(port, () => {
  console.log(`server is up on port ${port}`)
});


