import { createSlice } from '@reduxjs/toolkit'

import { IRootState } from '..'
import { IUser } from '../../interfaces/IUser'
import { IValidationErrorResponse } from '../../interfaces/IValidationErrorResponse'
import { login, logout, register } from '../actions/authActions'

// Initial Auth State
const initialState = {
	isAuth: false,
	currentUser: {} as IUser,
	loading: false,
	errors: [] as IValidationErrorResponse[],
	success: false,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clearError: state => {
			state.errors = []
		},
	},
	extraReducers(builder) {
		// === Registration ====
		builder.addCase(register.pending, state => {
			console.log('Register pending')
			state.loading = true
			state.errors = []
		})
		builder.addCase(register.fulfilled, (state, action) => {
			console.log('Register fulfilled')
			state.loading = false
			state.success = true
			state.currentUser = action.payload.currentUser
			state.isAuth = true
		})
		builder.addCase(register.rejected, (state, action) => {
			console.log('Register rejected')
			state.loading = false
			state.errors = action.payload as IValidationErrorResponse[]
			state.isAuth = false
			state.currentUser = {} as IUser
		})

		// === Login ====
		builder.addCase(login.pending, state => {
			state.isAuth = false
			state.loading = true
			state.errors = []
		})
		builder.addCase(login.fulfilled, (state, action) => {
			state.success = true
			state.currentUser = action.payload.currentUser
			state.isAuth = true
			state.loading = false
		})
		builder.addCase(login.rejected, (state, action) => {
			state.isAuth = false
			state.currentUser = {} as IUser
			state.errors = action.payload as IValidationErrorResponse[]
			console.log('Login Reject', state.errors)
			state.loading = false
		})

		// === Logout ====
		builder.addCase(logout.pending, state => {
			console.log('Logout pending')
			state.loading = true
			state.errors = []
		})
		builder.addCase(logout.fulfilled, state => {
			console.log('Logout fulfilled')
			state.loading = false
			state.success = true
			state.errors = [] as IValidationErrorResponse[]
			state.isAuth = false
			state.currentUser = {} as IUser
		})
		builder.addCase(logout.rejected, (state, action) => {
			console.log('Logout rejected')
			state.loading = false
			state.errors = [] as IValidationErrorResponse[]
			state.currentUser = {} as IUser
			state.isAuth = false
		})
	},
})

export const { clearError } = authSlice.actions

export default authSlice.reducer
