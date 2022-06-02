const dotenv = require('dotenv').config()
const express = require('express')
const port = process.env.PORT
const connectDB = require('./config/db')
const {errorHandler} = require('./middlewares/errormiddleware')
const bodyParser = require("body-parser")
const cors = require('cors');


//Connect to DB
connectDB()

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }))

app.use(cors())

//route for all operations of a message i.e get, update, delete and create a message
app.use('/api/message', require('./routes/messageroutes'))
// route for all user operations including user details
app.use('/api/users', require('./routes/userroutes'))

app.listen(port, () => console.log(`server has started on port ${port}`))