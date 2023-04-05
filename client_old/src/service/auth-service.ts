import { $api } from '../axios'
import { IAuthResponse } from '../interfaces/IAuthResponse'

async function startup(): Promise<IAuthResponse> {
	const response = await $api.get('/auth')
	return response.data
}

async function register(
	username: string,
	email: string,
	password: string,
	passwordConfirm: string,
	firstName: string,
	lastName: string
): Promise<IAuthResponse> {
	const response = await $api.post('/auth/signup', {
		username,
		email,
		password,
		passwordConfirm,
		firstName,
		lastName,
	})
	return response.data
}

async function login(
	username: string,
	password: string,
	remember: boolean = false
): Promise<IAuthResponse> {
	const response = await $api.post('/auth/signin', {
		username,
		password,
		remember,
	})
	return response.data
}

async function logout(): Promise<IAuthResponse> {
	const response = await $api.post('/auth/signout')
	console.log('Service Logout', response)
	return response.data
}

async function check(): Promise<IAuthResponse> {
	console.log('Start /auth/check request')

	const response = await $api.get('/auth/refresh')
	console.log('Response:', response)

	return response.data
}

async function activate(code: string): Promise<IAuthResponse> {
	const response = await $api.patch(`/auth/activation/${code}`)
	return response.data
}

async function askRestore(
	email: string,
	password: string,
	passwordConfirm: string
): Promise<{ message: string }> {
	const response = await $api.post('/auth/restore', {
		email,
		password,
		passwordConfirm,
	})
	return response.data
}

async function tryRestore(code: string): Promise<IAuthResponse> {
	const response = await $api.patch(`/auth/restore/${code}`)
	return response.data
}

export const AuthService = {
	startup,
	register,
	login,
	logout,
	activate,
	askRestore,
	tryRestore,
	check,
}
