module.exports = class ApiError extends Error {
	constructor(status, message, errors = []) {
		super(message)
		this.status = status
		this.errors = errors
	}

	static UnauthorizedUserError() {
		return new ApiError(403, 'User is not authorized')
	}

	static AlreadyExistUserError() {
		return new ApiError(303, 'User already exist')
	}

	static AuthHeaderError() {
		return new ApiError(401, 'User is not authorized (no Auth Header)')
	}

	static AccessTokenError() {
		return new ApiError(401, 'User is not authorized (no Access Token)')
	}

	static ValidateAccessTokenError() {
		return new ApiError(
			401,
			'User is not authorized (Access Token Validation error)'
		)
	}

	static RefreshTokenError() {
		return new ApiError(403, 'Wrong Refresh Token (cookie)')
	}

	static BadRequest(message) {
		return new ApiError(422, message)
	}

	static ValidationError(message, errors = []) {
		return new ApiError(422, message, errors)
	}

	static PermissionError() {
		return new ApiError(401, 'User has no permissions')
	}

	static ActivationError() {
		return new ApiError(401, 'Activation error has occurred')
	}

	static ServerError(message, error = []) {
		return new ApiError(500, message, error)
	}
}

// module.exports = ApiError
