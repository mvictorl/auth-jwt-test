const Router = require('express').Router
const router = new Router()

const testerCtrl = require('../controllers/tester-controller')

const { body, param } = require('express-validator')

router.get('/tester/exercises', testerCtrl.getAllExercises)

router.get('/tester/exercises/:id', testerCtrl.getExerciseById)

router.post('/tester/exercises', testerCtrl.addExercise)

router.patch('/tester/exercises', testerCtrl.changeExercise)

router.delete('/tester/exercises/:id', testerCtrl.deleteExercise)
// routes.post(
// 	'/auth/signup',

// 	body('username')
// 		.isLength({
// 			min: process.env.USERNAME_MIN_LENGTH,
// 			max: process.env.USERNAME_MAX_LENGTH,
// 		})
// 		.withMessage(
// 			`User name mast be from ${process.env.USERNAME_MIN_LENGTH} to ${process.env.USERNAME_MAX_LENGTH} characrets`
// 		)
// 		.bail()
// 		.custom(value => !/\s/.test(value))
// 		.withMessage('No spaces are allowed in the Username'),
// 	body('email').isEmail().withMessage('Incorrect email address'),
// 	body('passwordConfirm').custom((value, { req }) => {
// 		if (value !== req.body.password) {
// 			return Promise.reject('Password confirmation is incorrect')
// 		} else {
// 			return Promise.resolve()
// 		}
// 	}),
// 	body('password')
// 		.isLength({
// 			min: process.env.PASSWORD_MIN_LENGTH,
// 			max: process.env.PASSWORD_MAX_LENGTH,
// 		})
// 		.withMessage(
// 			`Password mast be from ${process.env.PASSWORD_MIN_LENGTH} to ${process.env.PASSWORD_MAX_LENGTH} characrets`
// 		),
// 	body('firstName')
// 		.optional()
// 		.toLowerCase()
// 		.isLength({
// 			min: process.env.USERFIRSTNAME_MIN_LENGTH,
// 			max: process.env.USERFIRSTNAME_MAX_LENGTH,
// 		})
// 		.withMessage(
// 			`User first name mast be from ${process.env.USERFIRSTNAME_MIN_LENGTH} to ${process.env.USERFIRSTNAME_MAX_LENGTH} characrets`
// 		),
// 	body('lastName')
// 		.optional()
// 		.toLowerCase()
// 		.isLength({
// 			min: process.env.USERLASTNAME_MIN_LENGTH,
// 			max: process.env.USERLASTNAME_MAX_LENGTH,
// 		})
// 		.withMessage(
// 			`User last name mast be from ${process.env.USERLASTNAME_MIN_LENGTH} to ${process.env.USERLASTNAME_MAX_LENGTH} characrets`
// 		),

// 	authCtrl.signup
// )

// routes.post(
// 	'/auth/signin',

// 	body('username')
// 		.isLength({
// 			min: process.env.USERNAME_MIN_LENGTH,
// 			max: process.env.USERNAME_MAX_LENGTH,
// 		})
// 		.withMessage(
// 			`User name mast be from ${process.env.USERNAME_MIN_LENGTH} to ${process.env.USERNAME_MAX_LENGTH} characrets`
// 		)
// 		.bail()
// 		.custom(value => !/\s/.test(value))
// 		.withMessage('Incorrect Username'),

// 	authCtrl.signin
// )

// routes.get('/auth/signout', authCtrl.signout)

// routes.get('/auth/check', authCtrl.check)

// routes.patch(
// 	'/auth/activation/:code',
// 	param('code').isUUID().withMessage('Incorrect the Activation code'),
// 	authCtrl.activation
// )

// routes.post(
// 	'/auth/restore',
// 	body('email').isEmail().withMessage('Incorrect email address'),
// 	body('password')
// 		.isLength({
// 			min: process.env.PASSWORD_MIN_LENGTH,
// 			max: process.env.PASSWORD_MAX_LENGTH,
// 		})
// 		.withMessage(
// 			`Password mast be from ${process.env.PASSWORD_MIN_LENGTH} to ${process.env.PASSWORD_MAX_LENGTH} characrets`
// 		)
// 		.bail()
// 		.custom(async (value, { req }) => {
// 			if (value != req.body.passwordConfirm) {
// 				throw new Error('Password confirmation is incorrect')
// 			}
// 		}),
// 	authCtrl.passwordRestoreRequest
// )
// routes.patch(
// 	'/auth/restore/:code',
// 	param('code').isUUID().withMessage('Incorrect the Restore password link'),
// 	authCtrl.passwordRestoreLinkCheck
// )

// routes.get('/auth/refresh', authCtrl.refresh)

module.exports = router
