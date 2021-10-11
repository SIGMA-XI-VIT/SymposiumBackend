const router = require('express').Router()

const {postRegistration, showRegistration, testRoute} = require('../controllers/registrationData')

router.get('/show',showRegistration )
router.post('/post', postRegistration)
router.get('/', testRoute)

module.exports = router