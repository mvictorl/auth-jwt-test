const dbClient = require('../prisma/dbClient')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const tokenSrv = require('./token-service')
const ApiError = require('./error-service')

class AuthService {
	async signup(username, email, password, firstName = '', lastName = '') {
		try {
			return await dbClient.user
				.findFirstOrThrow({
					where: {
						OR: [{ name: username }, { email }],
					},
					select: {
						name: true,
						email: true,
					},
				})
				.then(
					user => {
						const errors = []
						if (user.name === username)
							errors.push({
								msg: `User ${username} already exist`,
								param: 'username',
								value: username,
								location: 'body',
							})
						if (user.email === email)
							errors.push({
								msg: `E-mail ${email} already registered`,
								param: 'email',
								value: email,
								location: 'body',
							})
						throw ApiError.ValidationError(
							`User ${username} already exist`,
							errors
						)
					},
					async err => {
						const hashedPassword = await bcrypt.hash(password, 12)
						const activationLink = uuid.v4()

						const newUser = await dbClient.user.create({
							data: {
								name: username,
								email,
								password: hashedPassword,
								firstName,
								lastName,
								activationLink,
							},
							select: {
								id: true,
								name: true,
								firstName: true,
								lastName: true,
								roles: true,
								isActivated: true,
							},
						})

						const tokens = await tokenSrv.generatePairOfTokens({ ...newUser })
						const savedToken = await tokenSrv.saveRefreshToken(
							newUser.id,
							tokens.refreshToken
						)
						if (!savedToken) {
							await dbClient.user.delete({
								where: { id: newUser.id },
							})
							throw new apiError.ServerError('Signup server error')
						}

						return { ...tokens, user: newUser }
					}
				)
		} catch (e) {
			if (e.status === 422) {
				throw ApiError.ValidationError(
					`User ${username} already exist`,
					e.errors
				)
			} else {
				throw new apiError.ServerError('Signup server error', e)
			}
		}
	}

	async signin(username, password) {
		try {
			return await dbClient.user
				.findUniqueOrThrow({
					where: { name: username },
					select: {
						id: true,
						name: true,
						password: true,
						firstName: true,
						lastName: true,
						roles: true,
						isActivated: true,
					},
				})
				.then(
					async user => {
						if (!(await bcrypt.compare(password, user.password))) {
							throw ApiError.ValidationError('Incorrect password', [
								{
									value: password,
									msg: 'Incorrect password',
									param: 'password',
									location: 'body',
								},
							])
						}

						const userDto = {
							id: user.id,
							name: user.name,
							firstName: user.firstName || '',
							lastName: user.lastName || '',
							roles: user.roles,
							isActivated: user.isActivated,
						}

						const tokens = await tokenSrv.generatePairOfTokens({ ...userDto })

						const savedToken = await tokenSrv.saveRefreshToken(
							userDto.id,
							tokens.refreshToken
						)
						if (!savedToken) {
							throw new apiError.ServerError('Signin server error')
						}

						return { ...tokens, user: userDto }
					},
					err => {
						throw new ApiError.ServerError('User not found', err)
					}
				)
		} catch (e) {
			console.error('Signin server error', e)
			throw new ApiError.ServerError('Signin server error', e)
		}
	}

	async signout(refreshToken) {
		try {
			return await tokenSrv.removeToken(refreshToken)
		} catch (e) {
			console.error('Signin server error', e)
			throw new ApiError.ServerError('Signout server error', e)
		}
	}

	async check(refreshToken) {}

	async activation(activationCode, refreshToken) {}

	async refresh(refreshToken) {}
}

module.exports = authSrv = new AuthService()
