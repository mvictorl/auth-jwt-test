const dbClient = require('../prisma/dbClient')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const tokenSrv = require('./token-service')
const ApiError = require('./error-service')
const TokenUserDTO = require('../dtos/TokenUserDTO')

class AuthService {
	async signup(username, email, password, firstName = '', lastName = '') {
		try {
			return await dbClient.user
				.findFirstOrThrow({
					where: {
						OR: [{ username }, { email }],
					},
					select: {
						username: true,
						email: true,
					},
				})
				.then(
					user => {
						const errors = []
						if (user.username === username)
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
								username,
								email,
								password: hashedPassword,
								firstName: firstName
									? firstName.charAt(0).toUpperCase() + firstName.slice(1)
									: '',
								lastName: lastName
									? lastName.charAt(0).toUpperCase() + lastName.slice(1)
									: '',
								activationLink,
							},
							select: {
								id: true,
								username: true,
								firstName: true,
								lastName: true,
								roles: true,
								isActivated: true,
							},
						})

						const userDto = new TokenUserDTO(newUser)

						const tokens = await tokenSrv.generatePairOfTokens({ ...userDto })
						const savedToken = await tokenSrv.saveRefreshToken(
							userDto.id,
							tokens.refreshToken
						)
						if (!savedToken) {
							await dbClient.user.delete({
								where: { id: userDto.id },
							})
							throw new ApiError.ServerError('Signup server error')
						}
						return { tokens, user: newUser }
					}
				)
		} catch (e) {
			if (e.status === 422) {
				throw ApiError.ValidationError(e.message, e.errors)
			} else {
				throw new apiError.ServerError('Signup server error', e)
			}
		}
	}

	async signin(username, password) {
		try {
			return await dbClient.user
				.findUniqueOrThrow({
					where: { username },
					select: {
						id: true,
						username: true,
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
									value: '',
									msg: 'Incorrect password',
									param: 'password',
									location: 'body',
								},
							])
						}

						const userDto = new TokenUserDTO(user)

						const tokens = await tokenSrv.generatePairOfTokens({ ...userDto })
						const savedToken = await tokenSrv.saveRefreshToken(
							userDto.id,
							tokens.refreshToken
						)
						if (!savedToken) {
							throw new apiError.ServerError('Signin server error')
						}

						return { tokens, user }
					},
					err => {
						throw ApiError.ValidationError('User not found', [
							{
								value: username,
								msg: 'User not found',
								param: 'username',
								location: 'body',
							},
						])
					}
				)
		} catch (e) {
			if (e.status === 422) {
				throw ApiError.ValidationError(e.message, e.errors)
			} else {
				console.error('Signin server error', e)
				throw new ApiError.ServerError('Signup server error', e)
			}
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

	async activation(activationCode, refreshToken) {
		const userData = await tokenSrv.validateRefreshToken(refreshToken)
		if (!userData) {
			throw ApiError.UnauthorizedUserError()
		}

		try {
			const dbUser = await dbClient.user.findUnique({
				where: { id: userData.id },
				select: {
					activationLink: true,
				},
			})

			if (!dbUser || dbUser.activationLink !== activationCode) {
				throw ApiError.ActivationError('Incorrect activation link')
			}

			return await dbClient.user
				.update({
					where: { id: userData.id },
					data: {
						isActivated: true,
						roles: ['USER'],
						activationLink: null,
					},
					select: {
						id: true,
						username: true,
						firstName: true,
						lastName: true,
						roles: true,
						isActivated: true,
					},
				})
				.then(
					async updatedUser => {
						const userDto = new TokenUserDTO(updatedUser)

						const tokens = await tokenSrv.generatePairOfTokens({ ...userDto })
						const savedToken = await tokenSrv.saveRefreshToken(
							userDto.id,
							tokens.refreshToken
						)
						if (!savedToken) {
							throw new apiError.ServerError('Activation server error')
						}

						return { tokens, user: updatedUser }
					},
					err => {
						console.error('DB Error')
						throw ApiError.ServerError('DB Error', err)
					}
				)
		} catch (e) {
			if (e.status === 401) {
				throw ApiError.ActivationError('Incorrect activation link')
			} else {
				throw new apiError.ServerError('Validation server error', e)
			}
		}
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedUserError()
		}

		const userData = await tokenSrv.validateRefreshToken(refreshToken)

		const dbRefreshToken = await tokenSrv.findToken(refreshToken)

		if (!userData || !dbRefreshToken) {
			throw ApiError.UnauthorizedUserError()
		}

		try {
			return await dbClient.user
				.findUniqueOrThrow({
					where: { id: userData.id },
					select: {
						id: true,
						name: true,
						firstName: true,
						lastName: true,
						roles: true,
						isActivated: true,
					},
				})
				.then(
					async dbUser => {
						const userDto = new TokenUserDTO(dbUser)

						const tokens = await tokenSrv.generatePairOfTokens({ ...userDto })
						const savedToken = await tokenSrv.saveRefreshToken(
							userDto.id,
							tokens.refreshToken
						)
						if (!savedToken) {
							throw new apiError.ServerError('Refresh server error')
						}

						return { tokens, user: dbUser }
					},
					err => {
						console.error('DB Error')
						throw ApiError.ServerError('DB Error', err)
					}
				)
		} catch (e) {
			console.error('DB Error')
			throw ApiError.ServerError('DB Error', e)
		}
	}

	async paswordRestoreLinkGeneration(email, password) {
		try {
			return await dbClient.user
				.findUnique({
					where: { email },
					select: { id: true },
				})
				.then(
					async user => {
						const hashedPassword = await bcrypt.hash(password, 12)
						const link = uuid.v4()

						return await dbClient.newPassword
							.upsert({
								where: { userId: user.id },
								update: {
									newPassword: hashedPassword,
									restoreLink: link,
								},
								create: {
									userId: user.id,
									newPassword: hashedPassword,
									restoreLink: link,
								},
								select: {
									restoreLink: true,
								},
							})
							.then(data => data.restoreLink)
					},
					err => {
						throw ApiError.ValidationError('Password recovery error', {
							msg: 'Email user not registered',
							param: 'email',
							value: email,
							location: 'body',
						})
					}
				)
		} catch (e) {
			if (e.status === 422) {
				throw ApiError.ValidationError('Password recovery error', e.errors)
			} else {
				throw new apiError.ServerError('Signup server error', e)
			}
		}
	}

	async passwordRestoreLinkCheck(restoreLink) {
		try {
			return await dbClient.newPassword
				.findUnique({
					where: { restoreLink },
					select: {
						userId: true,
						newPassword: true,
					},
				})
				.then(async data => {
					await dbClient.newPassword.deleteMany({
						where: { restoreLink },
					})
					return data
				})
				.then(async data => {
					return await dbClient.user.update({
						where: { id: data.userId },
						data: { password: data.newPassword },
						select: {
							id: true,
							username: true,
							firstName: true,
							lastName: true,
							roles: true,
							isActivated: true,
						},
					})
				})
		} catch (e) {
			next(e)
		}
	}

	// ToDo: DRAFT
	async passwordUpdate(email, password) {
		try {
			const hashedPassword = await bcrypt.hash(password, 12)

			return await dbClient.user
				.update({
					where: { email },
					data: { password: hashedPassword },
					select: {
						id: true,
						username: true,
						firstName: true,
						lastName: true,
						roles: true,
						isActivated: true,
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
								username,
								email,
								password: hashedPassword,
								firstName,
								lastName,
								activationLink,
							},
							select: {
								id: true,
								username: true,
								firstName: true,
								lastName: true,
								roles: true,
								isActivated: true,
							},
						})

						const userDto = new TokenUserDTO(newUser)

						const tokens = await tokenSrv.generatePairOfTokens({ ...userDto })
						const savedToken = await tokenSrv.saveRefreshToken(
							userDto.id,
							tokens.refreshToken
						)
						if (!savedToken) {
							await dbClient.user.delete({
								where: { id: userDto.id },
							})
							throw new apiError.ServerError('Signup server error')
						}
						return { tokens, user: newUser }
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

	async check(refreshToken) {}
}

module.exports = authSrv = new AuthService()
