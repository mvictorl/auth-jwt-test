const Router = require('express').Router
const router = new Router()
const { body, param } = require('express-validator')
const authCtrl = require('./controllers/auth-controller')

router.post(
	'/auth/signup',

	body('username')
		.isLength({
			min: process.env.USERNAME_MIN_LENGTH,
			max: process.env.USERNAME_MAX_LENGTH,
		})
		.withMessage(
			`User name mast be from ${process.env.USERNAME_MIN_LENGTH} to ${process.env.USERNAME_MAX_LENGTH} characrets`
		)
		.bail()
		.custom(value => !/\s/.test(value))
		.withMessage('No spaces are allowed in the Username'),
	body('email').isEmail().withMessage('Incorrect email address'),
	body('password')
		.isLength({
			min: process.env.PASSWORD_MIN_LENGTH,
			max: process.env.PASSWORD_MAX_LENGTH,
		})
		.withMessage(
			`Password mast be from ${process.env.PASSWORD_MIN_LENGTH} to ${process.env.PASSWORD_MAX_LENGTH} characrets`
		)
		.bail()
		.custom(async (value, { req }) => {
			if (value != req.body.passwordConfirm) {
				throw new Error('Password confirmation is incorrect')
			}
		}),
	body('firstName')
		.optional()
		.toLowerCase()
		.isLength({
			min: process.env.USERFIRSTNAME_MIN_LENGTH,
			max: process.env.USERFIRSTNAME_MAX_LENGTH,
		})
		.withMessage(
			`User first name mast be from ${process.env.USERFIRSTNAME_MIN_LENGTH} to ${process.env.USERFIRSTNAME_MAX_LENGTH} characrets`
		),
	body('lastName')
		.optional()
		.toLowerCase()
		.isLength({
			min: process.env.USERLASTNAME_MIN_LENGTH,
			max: process.env.USERLASTNAME_MAX_LENGTH,
		})
		.withMessage(
			`User last name mast be from ${process.env.USERLASTNAME_MIN_LENGTH} to ${process.env.USERLASTNAME_MAX_LENGTH} characrets`
		),

	authCtrl.signup
)

router.post(
	'/auth/signin',

	body('username')
		.isLength({
			min: process.env.USERNAME_MIN_LENGTH,
			max: process.env.USERNAME_MAX_LENGTH,
		})
		.withMessage(
			`User name mast be from ${process.env.USERNAME_MIN_LENGTH} to ${process.env.USERNAME_MAX_LENGTH} characrets`
		)
		.bail()
		.custom(value => !/\s/.test(value))
		.withMessage('Incorrect Username'),

	authCtrl.signin
)

router.get('/auth/signout', authCtrl.signout)

router.get('/auth/check', authCtrl.check)

router.patch(
	'/auth/activation/:code',
	param('code').isUUID().withMessage('Incorrect the Activation code'),
	authCtrl.activation
)

router.post(
	'/auth/restore',
	body('email').isEmail().withMessage('Incorrect email address'),
	body('password')
		.isLength({
			min: process.env.PASSWORD_MIN_LENGTH,
			max: process.env.PASSWORD_MAX_LENGTH,
		})
		.withMessage(
			`Password mast be from ${process.env.PASSWORD_MIN_LENGTH} to ${process.env.PASSWORD_MAX_LENGTH} characrets`
		)
		.bail()
		.custom(async (value, { req }) => {
			if (value != req.body.passwordConfirm) {
				throw new Error('Password confirmation is incorrect')
			}
		}),
	authCtrl.passwordRestoreRequest
)
router.patch(
	'/auth/restore/:code',
	param('code').isUUID().withMessage('Incorrect the Restore password link'),
	authCtrl.passwordRestoreLinkCheck
)

router.get('/auth/refresh', authCtrl.refresh)

module.exports = router
