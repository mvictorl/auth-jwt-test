const { validationResult } = require('express-validator')
const testerSrv = require('../services/tester-service')
// const ApiError = require('../services/error-service')
// const ResponseUserDTO = require('../dtos/ResponseUserDTO')

class TesterContriller {
	async getAllExercises(req, res, next) {
		try {
			const data = await testerSrv.getAllExercises()
			return res.json(data)
		} catch (e) {
			console.error('Tester Controller error:', e)
		}
	}

	async getExerciseById(req, res, next) {
		try {
			const data = await testerSrv.getExerciseById(req.params.id)
			return res.json(data)
		} catch (e) {
			console.error('Tester Controller error:', e)
		}
	}

	async addExercise(req, res, next) {
		try {
			const { title, isMultiple, userId, description } = req.body
			const data = await testerSrv.addExercise(
				title,
				isMultiple,
				userId,
				description
			)
			return res.json(data)
		} catch (e) {
			console.error('Tester Controller error:', e)
		}
	}

	async changeExercise(req, res, next) {
		try {
			const id = req.params.id
			const { title, isMultiple, description } = req.body
			const data = await testerSrv.changeExercise(
				id,
				title,
				isMultiple,
				description
			)
			return res.json(data)
		} catch (e) {
			console.error('Tester Controller error:', e)
		}
	}

	async deleteExercise(req, res, next) {
		try {
			const data = await testerSrv.deleteExercise(req.params.id)
			return res.json(data)
		} catch (e) {
			console.error('Tester Controller error:', e)
		}
	}

	async addQuestion(req, res, next) {
		try {
			const exerciseId = req.params.eid
			const { text } = req.body
			const data = await testerSrv.addQuestion(exerciseId, text)
			return res.json(data)
		} catch (e) {
			console.error('Tester Controller error:', e)
		}
	}
	async changeQuestion(req, res, next) {
		try {
			const { question } = req.body
			const data = await testerSrv.changeQuestion(question)
			return res.json(data)
		} catch (e) {
			console.error('Tester Controller error:', e)
		}
	}
	async deleteQuestion(req, res, next) {
		try {
			const { question } = req.body
			const data = await testerSrv.deleteQuestion(question)
			return res.json(data)
		} catch (e) {
			console.error('Tester Controller error:', e)
		}
	}

	async addAnswer(req, res, next) {
		try {
			const questionId = req.params.qid
			const { answer } = req.body
			const data = await testerSrv.addAnswer(questionId, answer)
			return res.json(data)
		} catch (e) {
			console.error('Tester Controller error:', e)
		}
	}
	async changeAnswer(req, res, next) {
		try {
			const { answer } = req.body
			const data = await testerSrv.changeAnswer(answer)
			return res.json(data)
		} catch (e) {
			console.error('Tester Controller error:', e)
		}
	}
	async deleteAnswer(req, res, next) {
		try {
			const { answer } = req.body
			const data = await testerSrv.deleteAnswer(answer)
			return res.json(data)
		} catch (e) {
			console.error('Tester Controller error:', e)
		}
	}

	// async signup(req, res, next) {
	// 	try {
	// 		const validationErrors = validationResult(req)
	// 		if (!validationErrors.isEmpty()) {
	// 			const arr = validationErrors.array()
	// 			arr.map(a => {
	// 				if (a.param === 'password' || 'passwordConfirm') {
	// 					return { ...a, value: '' }
	// 				}
	// 			})
	// 			return next(ApiError.ValidationError('Validation error', arr))
	// 		}

	// 		const { username, email, password, firstName, lastName } = req.body
	// 		const userData = await authSrv.signup(
	// 			username,
	// 			email,
	// 			password,
	// 			firstName,
	// 			lastName
	// 		)
	// 		res.cookie('refreshToken', userData.tokens.refreshToken, {
	// 			httpOnly: true,
	// 			maxAge: 15 * 24 * 60 * 60 * 1000,
	// 		})

	// 		return res.json(new ResponseUserDTO(userData))
	// 	} catch (e) {
	// 		next(e)
	// 	}
	// }

	// async signin(req, res, next) {
	// 	try {
	// 		const validationErrors = validationResult(req)
	// 		if (!validationErrors.isEmpty()) {
	// 			const arr = validationErrors.array()
	// 			arr.map(a => {
	// 				if (a.param === 'password') {
	// 					return { ...a, value: '' }
	// 				}
	// 			})
	// 			return next(ApiError.ValidationError('Validation error', arr))
	// 		}

	// 		const { username, password, remember = false } = req.body
	// 		const userData = await authSrv.signin(username, password)

	// 		if (remember) {
	// 			res.cookie('refreshToken', userData.tokens.refreshToken, {
	// 				httpOnly: true,
	// 				maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days as refresh token
	// 			})
	// 		}

	// 		return res.json(new ResponseUserDTO(userData))
	// 	} catch (e) {
	// 		next(e)
	// 	}
	// }

	// async signout(req, res, next) {
	// 	try {
	// 		const { refreshToken } = req.cookies // Take the 'refreshToken' token from cookie
	// 		if (refreshToken) {
	// 			const data = await authSrv.signout(refreshToken) // Call 'logout' service function
	// 			res.clearCookie('refreshToken') // Delete the 'refreshToken' cookie
	// 			return res.json(data) // Return response to client
	// 		}
	// 		return res.json({ count: 0 })
	// 	} catch (e) {
	// 		console.error(e)
	// 		next(e)
	// 	}
	// }

	// async refresh(req, res, next) {
	// 	try {
	// 		const { refreshToken } = req.cookies

	// 		if (refreshToken) {
	// 			const userData = await authSrv.refresh(refreshToken)
	// 			res.cookie('refreshToken', userData.tokens.refreshToken, {
	// 				httpOnly: true,
	// 				maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days as refresh token
	// 			})

	// 			return res.json(new ResponseUserDTO(userData))
	// 		} else {
	// 			throw ApiError.UnauthorizedUserError()
	// 		}
	// 	} catch (e) {
	// 		next(e)
	// 	}
	// }

	// async activation(req, res, next) {
	// 	try {
	// 		const validationErrors = validationResult(req)
	// 		if (!validationErrors.isEmpty()) {
	// 			return next(
	// 				ApiError.ValidationError('Validation error', validationErrors.array())
	// 			)
	// 		}

	// 		const { refreshToken } = req.cookies
	// 		if (!refreshToken || !req.params.code) {
	// 			return next(ApiError.ActivationError())
	// 		}

	// 		const userData = await authSrv.activation(req.params.code, refreshToken)
	// 		res.cookie('refreshToken', userData.tokens.refreshToken, {
	// 			httpOnly: true,
	// 			maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days as refresh token
	// 		})

	// 		return res.json(new ResponseUserDTO(userData))
	// 	} catch (e) {
	// 		next(e)
	// 	}
	// }

	// async passwordRestoreRequest(req, res, next) {
	// 	try {
	// 		const validationErrors = validationResult(req)
	// 		if (!validationErrors.isEmpty()) {
	// 			return next(
	// 				ApiError.ValidationError('Validation error', validationErrors.array())
	// 			)
	// 		}

	// 		const { email, password } = req.body
	// 		const result = await authSrv.paswordRestoreLinkGeneration(email, password)

	// 		console.log('Result:', result)
	// 		// ToDo: Send result (restoreLink) to e-mail:
	// 		//  http://localhost:5000/restore/[restoreLink]
	// 		//  ==>>
	// 		// api/auth/restore/[restoreLink]

	// 		return res.json({ message: 'Ok!' })
	// 	} catch (e) {
	// 		next(e)
	// 	}
	// }

	// async passwordRestoreLinkCheck(req, res, next) {
	// 	try {
	// 		const validationErrors = validationResult(req)
	// 		if (!validationErrors.isEmpty()) {
	// 			return next(
	// 				ApiError.ValidationError('Validation error', validationErrors.array())
	// 			)
	// 		}
	// 		const result = await authSrv.passwordRestoreLinkCheck(req.params.code)
	// 		// return res.json(result)
	// 		return res.json({ message: 'Ok!' })
	// 	} catch (e) {
	// 		next(e)
	// 	}
	// }

	// async check(req, res, next) {
	// 	try {
	// 		return res.json({ message: 'Check' })
	// 	} catch (e) {
	// 		next(e)
	// 	}
	// }
}

module.exports = testerCtrl = new TesterContriller()
