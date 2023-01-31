/**
 * IN:
 * userData = {
 * 		user {...}
 *		tokens
 * {
 *
 * OUT:
 * {
 * 		user {id, name, firstName, lastName, roles, isActivated }
 *		accessToken
 * {
 */

class UserDTO {
	id
	name
	firstName = ''
	lastName = ''
	roles = ['USER']
	isActivated = false

	constructor(model) {
		this.id = model.id
		this.name = model.name
		this.firstName = model.firstName
		this.lastName = model.lastName
		this.roles = model.roles
		this.isActivated = model.isActivated
	}
}

module.exports = class ResponseUserDTO {
	user
	accessToken

	constructor(model) {
		this.user = new UserDTO(model.user)
		this.accessToken = model.tokens.accessToken
	}
}
