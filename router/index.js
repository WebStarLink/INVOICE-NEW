const Roter = require('express').Router
const UserController = require('../controllers/userController')
const routes = new Roter()
const {body} = require("express-validator")

routes.post('/registration', 
body('email').isEmail(),
body("password").isLength({min: 4, max: 32}),
UserController.registration)
routes.post('/login', UserController.login)
routes.post('/logout', UserController.logout)
routes.get('/activate/:link', UserController.activate)
routes.get('/refresh', UserController.refresh)
routes.get('/users', UserController.users)

module.exports = routes