const Router = require('express').Router
const router = new Router()
const { body, check } = require('express-validator')

router.post('/auth/signup', (req, res, next) => {
	res.json({ message: 'Registration' })
})

router.post('/auth/signin', (req, res, next) => {
	res.json({ message: 'Login' })
})

router.post('/auth/signout', (req, res, next) => {
	res.json({ message: 'Logout' })
})

router.get('/auth/check', (req, res, next) => {
	res.json({ message: 'Check' })
})

router.get('/auth/refresh', (req, res, next) => {
	res.json({ message: 'Refresh' })
})

router.patch('/auth/activation', (req, res, next) => {
	res.json({ message: 'Activation' })
})

module.exports = router
