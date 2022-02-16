const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')



// const users = []

module.exports = {

    registerUser: async (req, res) => {       
        
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            req.body.password = hashedPassword
            const user = new User(req.body)
            const newUser = await user.save()
            
            // users.push(req.body)
            res.status(201).json(newUser)
        } catch {
            res.status(500).send()
        }
        
    },
    authenticateUser: async (req, res, next) => {
        const user = await User.findOne({name: req.body.name})
        if (user == null) return res.status(404).json({ message: 'user does not exist' })

        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                const accessToken = jwt.sign(user.name, process.env.ACCESS_TOKEN_SECRET)
                res.json({ accessToken: accessToken })
            } else {
                res.status(401).json({ message: 'password incorrect' })
            }
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },

    authenticateToken:  (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        console.log('authHeader : ',authHeader)
        if(token == null) return res.sendStatus(401)
        console.log('access token secret : ',process.env.ACCESS_TOKEN_SECRET)
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if(err) return res.sendStatus(403)                 
                req.user = user

            })
            next()            
    },
    uptdateUser: (req, res) => {
        const user = User.findOne({name: req.params.id})
        
    }
}