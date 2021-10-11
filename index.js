require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const registrationRoute = require('./routes/registrationRoute')

app.use('/',registrationRoute)

const PORT = process.env.PORT || 3030

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(app.listen(PORT, () => console.log(`Listening to port ${PORT}`)))
.catch(err => console.log(err))
