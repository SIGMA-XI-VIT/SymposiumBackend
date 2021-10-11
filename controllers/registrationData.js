const Registration = require('../model/Registration')

const testRoute = (async(req,res) => {
    return res.send(JSON.stringify({version: 0.1, prerelease: true, paths: ["post", "show"]}))
})

const postRegistration = (async(req,res) => {
    try
    {
        const {name, email, phoneno} = req.body
        const registration = new Registration({
            name, email, phoneno
        })

        const regex_email = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        const regex_phone = /^[+]+[0-9]{8,15}$/
        if (!(regex_email.test(email)))
            return res.status(411).json({
            status: 'failure',
            message: 'enter a valid email'
        })

        if(!((regex_phone.test(phoneno)) && (phoneno.length <= 16) && (phoneno.length>=9)))
            return res.status(411).json({
                status: 'failure',
                message: 'enter a valid mobile number'
            })

        await registration.save()
        return res.status(201).json({status: 'record successfully added',data: registration})
    }
    catch(error) 
    {
        return res.status(500).json({
            status:'failure',
            error: error.message
        })
    }
})

const showRegistration = (async(req, res) => {
    try
    {
        const registration = await Registration.find()
    
        if(!registration || registration.length === 0)
        { 
            return res.status(404).json({
                status: 'failure',
                message: 'could not retrieve any records'
            })
        }

        return res.status(200).json({status: 'success',data: registration, count: registration.length})
    }
    catch(error) 
    {
        return res.status(500).json({
            status:'failure',
            error: error.message
        })
    }
})

module.exports = {postRegistration, showRegistration, testRoute}