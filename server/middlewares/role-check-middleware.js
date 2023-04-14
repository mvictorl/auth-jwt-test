const ApiErr = require('../services/error-service')

module.exports = function (roles) {
	return function (req, res, next) {
		console.log('===== Roles Midleware =====')
		const { user } = req
		if (
			user &&
			(user.roles.includes('ADMIN') || user.roles.some(r => roles.includes(r)))
		)
			return next()
		else return next(ApiErr.PermissionError())
	}
}
