module.exports = class TokenUserDTO {
	id
	username
	roles = ['USER']
	isActivated = false

	constructor(model) {
		this.id = model.id
		this.username = model.username
		this.roles = model.roles
		this.isActivated = model.isActivated
	}
}
