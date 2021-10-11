const router = require('express').Router()

const {postRegistration, showRegistration} = require('../controllers/registrationData')

router.get('/show',showRegistration )
router.post('/post', postRegistration)

module.exports = router