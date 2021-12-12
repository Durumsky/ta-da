const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User.model')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('../middlewares/jwt')


const saltRounds = 10


router.post('/signup', (req, res, next) =>{

    const { username, password} = req.body
    

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

    return User.create({username, password: hashedPassword, partnerID: '', connected: false})

    })
    .then(createdUser => {
        const { username, _id } = createdUser
        const user = { username, _id }

        res.status(201).json({ user: user })
    })

    .catch(err => {
        next(err)
        res.status(500).json({ message: 'Internal Server Error' })
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
        }
        else {
            res.status(401).json({ message: 'Unable to authenticate user'})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' })
    })
})


router.get('/verify', isAuthenticated, (req, res, next) => {
    // if the token is valid we can acces it on req.payload
    console.log('/Verify sais that the token is valid. The ID of the user:', req.payload._id)
    res.status(200).json(req.payload)
})

router.post('/connect', (req, res, next) => {
    //console.log(req.body.user._id, req.body.partnerID)
    const username = req.body.user.username
    const userID = req.body.user._id
    const partnerID = req.body.partnerID
    

    User.findOneAndUpdate({username}, {partnerID: partnerID}, {new: true})
    .then((user)=>{
        const userConnected = user.connected
        User.findOne({_id: partnerID})
        .then(foundPartner => {
            //console.log(foundPartner.connected)
            //check if the provided ID belong to any existing user
            if (!foundPartner){
                res.status(400).json({ message: 'The ID you provided was not found'})
            }
            //the partner user is found
            //check if the foundUser has the ID of the user in his/her partnerID key
            else if (foundPartner.partnerID === userID){
                //console.log('both users have introduced their partnerIDs')
                //update both user to connected: true
                User.findOneAndUpdate({username}, {connected: true}, {new: true})
                .then(()=>{
                    res.status(200).json({userConnected: userConnected})
                    User.findOneAndUpdate({_id: partnerID}, {connected: true}, {new: true})
                    .then(()=>{})
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
                
            }
        })
    })
    .catch(err => console.log(err))
})

router.post('/connectCheck', (req, res, next)=> {
    //console.log('/connectCheck works')
    const username = req.body.username
    User.findOne({username})
    .then(foundUser => {
        const connected = foundUser.connected
        res.status(200).json({userConnected: connected })
    })
    .catch(err => console.log(err))
})




module.exports = router;