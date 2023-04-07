const ApiErr = require('../services/error-service')
const tokenSrv = require('../services/token-service')

module.exports = async function (req, res, next) {
	console.log('===== Auth Midleware =====')
	try {
		const authHeader = req.headers.authorization

		if (!authHeader) {
			console.log('No Auth Header')
			return next(ApiErr.AuthHeaderError())
		}

		// Get access token from Authorization header string: "Bearer eyJhbGc...DLXay"
		const accessToken = authHeader.split(' ')[1]
		if (!accessToken) {
			console.log('No Access Token')
			return next(ApiErr.AccessTokenError())
		}

		const userData = await tokenSrv.validateAccessToken(accessToken)
		if (!userData) {
			console.log('No Valid Token:', accessToken)
			return next(ApiErr.ValidateAccessTokenError())
		}
		req.user = userData
		next()
	} catch (e) {
		return next(ApiErr.UnauthorizedUserError())
	}
}
