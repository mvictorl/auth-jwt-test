const dbClient = require('../prisma/dbClient')
const jwt = require('jsonwebtoken')

class TokenService {
	async generatePairOfTokens(userToken) {
		try {
			const accessToken = await jwt.sign(
				userToken,
				process.env.JWT_ACCESS_SECRET,
				{
					algorithm: 'HS256',
					expiresIn: '30s',
				}
			)
			const refreshToken = await jwt.sign(
				userToken,
				process.env.JWT_REFRESH_SECRET,
				{
					algorithm: 'HS256',
					expiresIn: '1h',
				}
			)

			return { accessToken, refreshToken }
		} catch (e) {
			console.error('The pair of tokens generation error')
			throw ApiError.BadRequest('Token service error', e)
			return null
		}
	}

	async saveRefreshToken(userId, refreshToken) {
		try {
			// ONE token on one user!!!
			return await dbClient.token
				.findUnique({
					where: { userId },
					select: {
						id: true,
						refresh: true,
					},
				})
				.then(
					async tokenData => {
						if (tokenData) {
							return await dbClient.token.update({
								where: { id: tokenData.id },
								data: { refresh: refreshToken },
								select: { refresh: true },
							})
						} else {
							return await dbClient.token.create({
								data: {
									userId,
									refresh: refreshToken,
								},
								select: { refresh: true },
							})
						}
					},
					() => null
				)
		} catch (e) {
			console.error('The refresh token saving in DB error', e)
			throw ApiError.DataBaseError('DB Error', e)
			return null
		}
	}

	async removeToken(refreshToken) {
		try {
			return await dbClient.token
				.deleteMany({
					where: { refresh: refreshToken },
				})
				.then(
					result => result,
					() => null
				)
		} catch (e) {
			console.error('The refresh token deleting from DB error', e)
			return null
			// throw ApiError.DataBaseError('DB Error', e)
		}
	}

	async findToken(refreshToken) {
		try {
			return await dbClient.token.findFirst({
				where: { refresh: refreshToken },
				select: {
					id: true,
					refresh: true,
				},
			})
		} catch (e) {
			console.error('The refresh token lookup in DB error', e)
			return null
			// throw ApiError.DataBaseError('DB Error', e)
		}
	}

	async validateAccessToken(accessToken) {
		try {
			return await jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
		} catch (e) {
			console.error('The access token validating error')
			return null
		}
	}

	async validateRefreshToken(refreshToken) {
		try {
			const verify = await jwt.verify(
				refreshToken,
				process.env.JWT_REFRESH_SECRET
			)
			console.log('Verify:', verify)
			return verify
		} catch (e) {
			console.error('The refresh token validating error')
			return null
		}
	}
}

module.exports = tokenSrv = new TokenService()
