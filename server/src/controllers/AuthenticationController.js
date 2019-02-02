const {
    User
} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSingUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    try {
        return jwt.sign(user, config.authentication.jwtSecret, {
            expiresIn: ONE_WEEK
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    async register(req, res) {
        try {
            const user = await User.create(req.body)
            res.send(user.toJSON())
        } catch (err) {
            res.status(400).send({
                error: 'This email account is already in use'
            })
        }
        res.send({
            message: `Hello ${req.body.email}, you are registered!`
        })
    },
    async login(req, res) {
        try {
            const {
                email,
                password
            } = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!user) {
                res.status(403).send({
                    error: 'The login information was incorrect'
                })
            }
            const isPasswordValid = await user.comparePassword(password)
            if (!isPasswordValid) {
                res.status(403).send({
                    error: 'The login information was incorrect'
                })
            }
            const userJson = user.toJSON()
            const token = jwtSingUser(userJson)
            res.send({
                user: userJson,
                token: token
            })
        } catch (err) {
            res.status(500).send({
                error: 'An error has ocurred trying to log in'
            })
        }
    }
}