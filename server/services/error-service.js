module.exports = class ApiError extends Error {
	constructor(status, message, errors = []) {
		super(message)
		this.status = status
		this.errors = errors
	}

	// Redirection statuses
	static AlreadyExistUserError() {
		return new ApiError(303, 'User already exist')
		// return new ApiError(409, 'User already exist') // Conflict
	}

	// Client error statuses
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

	static ActivationError() {
		return new ApiError(401, 'Activation error has occurred')
	}

	static UnauthorizedUserError() {
		return new ApiError(401, 'User is not authorized')
	}

	static RefreshTokenError() {
		return new ApiError(401, 'Wrong Refresh Token (cookie)')
	}

	static PermissionError() {
		return new ApiError(403, 'User has no permissions')
	}

	static BadRequest(message) {
		return new ApiError(422, message)
	}

	static ValidationError(message, errors = []) {
		return new ApiError(422, message, errors)
	}

	// Server error statuses
	static ServerError(message, error = []) {
		return new ApiError(500, message, error)
	}
}

// module.exports = ApiError
