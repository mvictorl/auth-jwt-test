import { createAsyncThunk } from '@reduxjs/toolkit'
import { TesterService } from '../../service/tester-service'
import axios from 'axios'
import { IExercise } from '../../interfaces/IExercise'
import { IUser } from '../../interfaces/IUser'

// const API_URL: string = import.meta.env.VITE_API_URL || ''
// const http = axios.create({
// 	withCredentials: true,
// 	baseURL: API_URL,
// })

export const getAllExercises = createAsyncThunk(
	'tester/getAllExercises',
	async (_, { rejectWithValue }) => {
		try {
			return await TesterService.getAllExercises()
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

type addExerciseProps = {
	title: string
	isMultiple: boolean
	authorId: string
	description: string
}
export const addExercise = createAsyncThunk(
	'tester/addExercises',
	async (
		{ title, isMultiple, authorId, description }: addExerciseProps,
		{ rejectWithValue }
	) => {
		try {
			return await TesterService.addExercises(
				title,
				isMultiple,
				authorId,
				description
			)
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

type changeExerciseProps = {
	id: string
	title: string
	isMultiple: boolean
	description: string
}
export const changeExercises = createAsyncThunk(
	'tester/changeExerciseProps',
	async (
		{ id, title, isMultiple, description }: changeExerciseProps,
		{ rejectWithValue }
	) => {
		try {
			return await TesterService.changeExercises(
				id,
				title,
				isMultiple,
				description
			)
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

type deleteExerciseProps = { id: string }
export const deleteExercise = createAsyncThunk(
	'tester/deleteExercise',
	async ({ id }: deleteExerciseProps, { rejectWithValue }) => {
		try {
			return await TesterService.deleteExercise(id)
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

// type loginProps = {
// 	username: string
// 	password: string
// 	remember: boolean
// }
// export const login = createAsyncThunk(
// 	'auth/login',
// 	async ({ username, password, remember }: loginProps, { rejectWithValue }) => {
// 		try {
// 			const data = await AuthService.login(username, password, remember)

// 			if (!data.user || !data.accessToken) throw Error('Server error on Login')

// 			localStorage.setItem('bearer-token', data.accessToken)
// 			return { currentUser: data.user }
// 		} catch (error: any) {
// 			if (error.response && error.response.data.errors) {
// 				return rejectWithValue(error.response.data.errors)
// 			}
// 			return rejectWithValue(error)
// 		}
// 	}
// )

// export const logout = createAsyncThunk(
// 	'auth/logout',
// 	async ({}, { rejectWithValue }) => {
// 		try {
// 			return await AuthService.logout()
// 		} catch (error) {
// 			return rejectWithValue(error)
// 		}
// 	}
// )
