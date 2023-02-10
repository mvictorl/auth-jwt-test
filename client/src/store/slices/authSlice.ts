import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { IRootState } from '..'
import { IUser } from '../../interfaces/IUser'
import { AuthService } from '../../service/auth-service'

// Initial Auth State
const initialState = {
	currentUser: {} as IUser,
}

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
				firstName,
				lastName,
				password,
				passwordConfirm
			)
			if (!data.user || !data.accessToken) throw Error('Server error on Login')
			else {
				return { currentUser: data.user }
			}
		} catch (error: any) {
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
			return rejectWithValue(error)
		}
	}
)

export const logout = createAsyncThunk(
	'auth/logout',
	async ({}, { rejectWithValue }) => {
		try {
			await AuthService.logout()
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(register.pending, () => {
			console.log('Register pending')
		})
		builder.addCase(register.fulfilled, () => {
			console.log('Register fulfilled')
		})
		builder.addCase(register.rejected, () => {
			console.log('Register rejected')
		})

		builder.addCase(login.pending, () => {
			console.log('Login pending')
		})
		builder.addCase(login.fulfilled, (state, action) => {
			console.log('Login fulfilled')
			state.currentUser = action.payload.currentUser
		})
		builder.addCase(login.rejected, state => {
			console.log('Login rejected')
			state.currentUser = {} as IUser
		})

		builder.addCase(logout.pending, () => {
			console.log('Logout pending')
		})
		builder.addCase(logout.fulfilled, () => {
			console.log('Logout fulfilled')
		})
		builder.addCase(logout.rejected, () => {
			console.log('Logout rejected')
		})
	},
})

export default authSlice.reducer

export const selectCurrentUser = (state: IRootState) => state.auth.currentUser
