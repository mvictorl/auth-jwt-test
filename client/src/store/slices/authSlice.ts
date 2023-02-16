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
	reducers: {},
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
			state.isAuth = true
			state.currentUser = action.payload.currentUser
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
			console.log('Login pending')
			state.loading = true
			state.errors = []
		})
		builder.addCase(login.fulfilled, (state, action) => {
			console.log('Login fulfilled')
			state.loading = false
			state.success = true
			state.isAuth = true
			state.currentUser = action.payload.currentUser
		})
		builder.addCase(login.rejected, (state, action) => {
			console.log('Login rejected. payload:', action.payload)
			state.loading = false
			state.errors = action.payload as IValidationErrorResponse[]
			state.isAuth = false
			state.currentUser = {} as IUser
			// state.errors = action.payload.errors || []
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
			state.currentUser = {} as IUser
		})
		builder.addCase(logout.rejected, (state, action) => {
			console.log('Logout rejected')
			state.loading = false
			state.errors = action.payload as IValidationErrorResponse[]
			state.currentUser = {} as IUser
		})
	},
})

export default authSlice.reducer

export const selectIsAuth = (state: IRootState) => state.auth.isAuth
export const selectCurrentUser = (state: IRootState) => state.auth.currentUser
export const selectLoading = (state: IRootState) => state.auth.loading
export const selectSuccess = (state: IRootState) => state.auth.success
export const selectErrors = (state: IRootState) => state.auth.errors
