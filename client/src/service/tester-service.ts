import { $api } from '../axios'
import axios from 'axios'
import { IExercise } from '../interfaces/IExercise'

const API_URL: string = import.meta.env.VITE_API_URL || ''
const http = axios.create({
	withCredentials: true,
	baseURL: API_URL,
})

async function getAllExercises(): Promise<IExercise[]> {
	const response = await $api.get('/tester/exercises')
	return response.data
}

async function addExercises(
	title: string,
	isMultiple: boolean,
	authorId: string,
	description: string
): Promise<IExercise> {
	const response = await $api.post('/tester/exercises', {
		title,
		isMultiple,
		authorId,
		description,
	})
	return response.data
}

async function changeExercises(
	id: string,
	title: string,
	isMultiple: boolean,
	description: string
): Promise<IExercise> {
	const response = await $api.patch('/tester/exercises', {
		id,
		title,
		isMultiple,
		description,
	})
	return response.data
}

async function deleteExercise(id: string): Promise<IExercise> {
	const response = await $api.delete(`/tester/exercises/${id}`)
	return response.data
}

// async function login(
// 	username: string,
// 	password: string,
// 	remember: boolean = false
// ): Promise<IAuthResponse> {
// 	const response = await $api.post('/auth/signin', {
// 		username,
// 		password,
// 		remember,
// 	})
// 	return response.data
// }

// async function logout(): Promise<IAuthResponse> {
// 	const response = await $api.post('/auth/signout')
// 	console.log('Service Logout', response)
// 	return response.data
// }

// async function activate(code: string): Promise<IAuthResponse> {
// 	const response = await $api.patch(`/auth/activation/${code}`)
// 	return response.data
// }

// async function askRestore(
// 	email: string,
// 	password: string,
// 	passwordConfirm: string
// ): Promise<{ message: string }> {
// 	const response = await $api.post('/auth/restore', {
// 		email,
// 		password,
// 		passwordConfirm,
// 	})
// 	return response.data
// }

// async function tryRestore(code: string): Promise<IAuthResponse> {
// 	const response = await $api.patch(`/auth/restore/${code}`)
// 	return response.data
// }

export const TesterService = {
	getAllExercises,
	addExercises,
	changeExercises,
	deleteExercise,
}
