const { validationResult } = require('express-validator')
const authSrv = require('../services/auth-service')
const ApiError = require('../services/error-service')
const ResponseUserDTO = require('../dtos/ResponseUserDTO')

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
			res.cookie('refreshToken', userData.tokens.refreshToken, {
				httpOnly: true,
				maxAge: 15 * 24 * 60 * 60 * 1000,
			})

			return res.json(new ResponseUserDTO(userData))
		} catch (e) {
			next(e)
		}
	}

	async signin(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(
					ApiError.ValidationError('Validation error', errors.array())
				)
			}

			const { username, password, remember = false } = req.body
			const userData = await authSrv.signin(username, password)

			if (remember) {
				res.cookie('refreshToken', userData.tokens.refreshToken, {
					httpOnly: true,
					maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days as refresh token
				})
			}

			return res.json(new ResponseUserDTO(userData))
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
			return res.json({ count: 0 })
		} catch (e) {
			console.error(e)
			next(e)
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies

			if (refreshToken) {
				const userData = await authSrv.refresh(refreshToken)
				res.cookie('refreshToken', userData.tokens.refreshToken, {
					httpOnly: true,
					maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days as refresh token
				})

				return res.json(new ResponseUserDTO(userData))
			} else {
				throw ApiError.UnauthorizedUserError()
			}
		} catch (e) {
			next(e)
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

			const { refreshToken } = req.cookies
			if (!refreshToken || !req.params.code) {
				return next(ApiError.ActivationError())
			}

			const userData = await authSrv.activation(req.params.code, refreshToken)
			res.cookie('refreshToken', userData.tokens.refreshToken, {
				httpOnly: true,
				maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days as refresh token
			})

			return res.json(new ResponseUserDTO(userData))
		} catch (e) {
			next(e)
		}
	}

	async passwordRestoreRequest(req, res, next) {
		try {
			const validationErrors = validationResult(req)
			if (!validationErrors.isEmpty()) {
				return next(
					ApiError.ValidationError('Validation error', validationErrors.array())
				)
			}

			const { email, password } = req.body
			const result = await authSrv.paswordRestoreLinkGeneration(email, password)

			console.log('Result:', result)
			// ToDo: Send result (restoreLink) to e-mail:
			//  http://localhost:5000/restore/[restoreLink]
			//  ==>>
			// api/auth/restore/[restoreLink]

			return res.json({ message: 'Ok!' })
		} catch (e) {
			next(e)
		}
	}

	async passwordRestoreLinkCheck(req, res, next) {
		try {
			const validationErrors = validationResult(req)
			if (!validationErrors.isEmpty()) {
				return next(
					ApiError.ValidationError('Validation error', validationErrors.array())
				)
			}
			const result = await authSrv.passwordRestoreLinkCheck(req.params.code)
			return res.json(result)
		} catch (e) {
			next(e)
		}
	}

	async check(req, res, next) {
		try {
			return res.json({ message: 'Check' })
		} catch (e) {
			next(e)
		}
	}
}

module.exports = authCtrl = new AuthContriller()
