const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts')

// specifying port for our application
const port = process.env.PORT || 4000
// importing the routes
const indexRoute = require('./routes/index')
const studentRoutes = require('./routes/student')

// view engine configuration
// setting ejs as our view engine
app.set('view engine', 'ejs');
// setting view directory location for app
// where __dirname represents current directory in which
// script is being executed

app.set('views', __dirname+'/views');
//setting main as our default layout for app
app.set('layout', 'layouts/main');
// adding expresslayout middleware
app.use(expressLayouts)
// to serve static files
app.use(express.static('public'))
// importing mongoose library
const mongoose = require('mongoose');

// uri for our mongodb atlas cluster
let uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.pnum9.mongodb.net/?retryWrites=true&w=majority";


// to remove warning
mongoose.set('strictQuery', false)

// mongoose.connect(uri, options): it returns promise

mongoose.connect(uri, {dbName: 'student_db'}).then(() =>{
  console.log('database connection successful');
}).catch(err => {
  console.log('err connecting db due to: ', err)
})


// for homepage, use this router
app.use('/', indexRoute);
// for students routes forward request to it
app.use('/students', studentRoutes);
app.listen(port)




