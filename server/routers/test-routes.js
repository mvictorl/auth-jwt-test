const Router = require('express').Router
const router = new Router()

// const testerCtrl = require('../controllers/tester-controller')
const authMiddleware = require('../middlewares/auth-middleware')
// const { body, param } = require('express-validator')
const roleChecker = require('../middlewares/role-check-middleware')

router.get('/one', authMiddleware, roleChecker('USER'), (req, res, next) => {
	const userName = req.user.username
	const roles = req.user.roles
	return res.json({ username: userName, roles })
})

module.exports = router
