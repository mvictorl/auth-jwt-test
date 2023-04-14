import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService } from '../../store/services/auth-service'

export const startup = createAsyncThunk(
	'auth/startup',
	async (_, { rejectWithValue }) => {
		try {
			const data = await AuthService.startup()
			if (!data.user || !data.accessToken) throw Error('Server error on Login')
			else {
				return { currentUser: data.user }
			}
		} catch (error: any) {
			if (error.response && error.response.data.errors) {
				return rejectWithValue(error.response.data.errors)
			}
			return rejectWithValue(error)
		}
	}
)

type registerProps = {
	username: string
	email: string
	firstName: string
	lastName: string
	password: string
	passwordConfirm: string
}
export const register = createAsyncThunk(
	'auth/register',
	async (
		{
			username,
			email,
			firstName,
			lastName,
			password,
			passwordConfirm,
		}: registerProps,
		{ rejectWithValue }
	) => {
		try {
			const data = await AuthService.register(
				username,
				email,
				password,
				passwordConfirm,
				firstName,
				lastName
			)
			if (!data.user || !data.accessToken) throw Error('Server error on Login')
			else {
				return { currentUser: data.user }
			}
		} catch (error: any) {
			if (error.response && error.response.data.errors) {
				return rejectWithValue(error.response.data.errors)
			}
			return rejectWithValue(error)
		}
	}
)

type loginProps = {
	username: string
	password: string
	remember: boolean
}
export const login = createAsyncThunk(
	'auth/login',
	async ({ username, password, remember }: loginProps, { rejectWithValue }) => {
		try {
			const data = await AuthService.login(username, password, remember)

			if (!data.user || !data.accessToken) throw Error('Server error on Login')

			localStorage.setItem('bearer-token', data.accessToken)
			return { currentUser: data.user }
		} catch (error: any) {
			if (error.response && error.response.data.errors) {
				return rejectWithValue(error.response.data.errors)
			}
			return rejectWithValue(error)
		}
	}
)

export const logout = createAsyncThunk(
	'auth/logout',
	async (_, { rejectWithValue }) => {
		console.log('Thunk Logout Start')
		try {
			const data = await AuthService.logout()
			return data.count
		} catch (error: any) {
			console.error('Error Logout:', error)
			return rejectWithValue(error)
		}
	}
)

export const check = createAsyncThunk(
	'auth/check',
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const data = await AuthService.check()
			console.log('Check:', data)

			if (!data.user || !data.accessToken) {
				localStorage.removeItem('bearer-token')
				throw Error('Server error on Check')
			} else {
				localStorage.setItem('bearer-token', data.accessToken)
				return { currentUser: data.user }
			}
		} catch (error: any) {
			if (error.response && error.response.data.errors) {
				return rejectWithValue(error.response.data.errors)
			}
			return rejectWithValue(error)
			// const message =
			// 	(error.response &&
			// 		error.response.data &&
			// 		error.response.data.message) ||
			// 	error.message ||
			// 	error.toString()
			// dispatch(setMessage(message))
			// return { currentUser: initialState.currentUser }
		}
	}
)

type restoreProps = {
	code: string
}
export const restore = createAsyncThunk(
	'auth/restore',
	async ({ code }: restoreProps, { rejectWithValue }) => {
		console.log('Thunk Restore Start')
		try {
			const data = await AuthService.tryRestore(code)
			return data
		} catch (error: any) {
			console.error('Error Logout:', error)
			return rejectWithValue(error)
		}
	}
)
