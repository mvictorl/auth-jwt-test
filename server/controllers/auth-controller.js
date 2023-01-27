const { validationResult } = require('express-validator')
const authSrv = require('../services/auth-service')
const ApiError = require('../services/error-service')

class AuthContriller {
	async signup(req, res, next) {
		try {
			const validationErrors = validationResult(req)
			if (!validationErrors.isEmpty()) {
				return next(
					ApiError.ValidationError('Validation error', validationErrors.array())
				)
			}

			const { username, email, password, firstName, lastName } = req.body
			const userData = await authSrv.signup(
				username,
				email,
				password,
				firstName,
				lastName
			)

			res.cookie('refreshToken', userData.refreshToken, {
				httpOnly: true,
				maxAge: 15 * 24 * 60 * 60 * 1000,
			})

			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async signin(req, res, next) {
		try {
			const { username, password } = req.body
			const userData = await authSrv.signin(username, password)

			res.cookie('refreshToken', userData.refreshToken, {
				httpOnly: true,
				maxAge: 15 * 24 * 60 * 60 * 1000,
			})

			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async signout(req, res, next) {
		try {
			const { refreshToken } = req.cookies // Take the 'refreshToken' token from cookie
			if (refreshToken) {
				const data = await authSrv.signout(refreshToken) // Call 'logout' service function
				res.clearCookie('refreshToken') // Delete the 'refreshToken' cookie
				return res.json(data) // Return response to client
			}
			return next()
		} catch (e) {
			next(e)
		}
	}

	async check(req, res, next) {
		try {
			return res.json({ message: 'Check' })
		} catch (e) {
			next()
		}
	}

	async activation(req, res, next) {
		try {
			const validationErrors = validationResult(req)
			if (!validationErrors.isEmpty()) {
				return next(
					ApiError.ValidationError('Validation error', validationErrors.array())
				)
			}

			return res.json({ message: 'Activation', code: req.params.code })
		} catch (e) {
			next()
		}
	}

	async refresh(req, res, next) {
		try {
			return res.json({ message: 'Refresh' })
		} catch (e) {
			next()
		}
	}
}

module.exports = authCtrl = new AuthContriller()
