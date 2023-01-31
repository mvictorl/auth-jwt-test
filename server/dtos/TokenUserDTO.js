module.exports = class TokenUserDTO {
	id
	name
	roles = ['USER']
	isActivated = false

	constructor(model) {
		this.id = model.id
		this.name = model.name
		this.roles = model.roles
		this.isActivated = model.isActivated
	}
}
