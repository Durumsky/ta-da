const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User.model')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('../middlewares/jwt')


const saltRounds = 10


router.post('/signup', (req, res, next) =>{

    const { username, password, name, lastName, pronounce} = req.body
    

    if (username === '' || password === '') {
        res.status(400).json({ message: 'Provide username and password'})
        return
    }

    // Use regex to validate the password format
	if (password.length < 4) {
		res.status(400).json({ message: 'Password must have at least 4 characters' });
		return;
	}

    //user input is valid
    //Check if user already exists

    User.findOne({ username })
    .then(foundUser => {
        if (foundUser){
            res.status(400).json({ message: 'User already exists'})
            return
        }

    //Username is unique => hash the pasword and create the user
    const salt = bcrypt.genSaltSync(saltRounds)
    const hashedPassword = bcrypt.hashSync(password, salt)

    return User.create({username, password: hashedPassword, partnerID: '', connected: false, name, lastName, pronounce})

    })
    .then(createdUser => {
        const { username, _id } = createdUser
        const user = { username, _id }

        res.status(201).json({ user: user })
        return;
    })

    .catch(err => {
        next(err)
        res.status(500).json({ message: 'Internal Server Error' })
        return;
    })
})

router.post('/login', (req, res, next) => {

    const { username, password } = req.body

    if (username === '' || password === '') {
        res.status(400).json({ message: 'Provide username and password'})
        return
    }

    User.findOne({ username })
    .then(foundUser => {
        if (!foundUser){
            res.status(400).json({ message: 'User not found'})
            return;
        }

        //this is a boolean
        const passwordCorrect = bcrypt.compareSync(password, foundUser.password)

        if (passwordCorrect){
            const { _id, username } = foundUser
            const payload = { _id, username }

            //create the json web token
            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                { algorithm: 'HS256', expiresIn: '12h' }
            )
        const userConnected = foundUser.connected

           
            

            res.status(200).json({ authToken: authToken, userConnected: userConnected })
            return;
        }
        else {
            res.status(401).json({ message: 'Unable to authenticate user'})
            return;
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' })
        return;
    })
})


router.get('/verify', isAuthenticated, (req, res, next) => {
    // if the token is valid we can acces it on req.payload
    console.log('/Verify sais that the token is valid. The ID of the user:')
    res.status(200).json(req.payload)
    return;
})










module.exports = router;