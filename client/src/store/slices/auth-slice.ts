import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../interfaces/IUser'
import { IValidationErrorResponse } from '../../interfaces/IValidationErrorResponse'
import { check, login, logout, register, restore } from '../thunks/auth-thunk'

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
		clearSuccess: state => {
			state.success = false
		},
	},
	extraReducers(builder) {
		// === Registration ====
		builder.addCase(register.pending, state => {
			console.log('Register pending')
			state.loading = true
			state.success = false
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
			state.success = false
			state.currentUser = {} as IUser
		})

		// === Login ====
		builder.addCase(login.pending, state => {
			console.log('Login Pending')
			state.isAuth = false
			state.loading = true
			state.errors = []
		})
		builder.addCase(login.fulfilled, (state, action) => {
			console.log('Login Fulfilled')
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
			console.log('Logout Pending')
			state.loading = true
			state.errors = []
		})
		builder.addCase(logout.fulfilled, state => {
			console.log('Logout Fulfilled')
			state.loading = false
			state.success = true
			state.errors = [] as IValidationErrorResponse[]
			state.isAuth = false
			state.currentUser = {} as IUser
		})
		builder.addCase(logout.rejected, state => {
			console.log('Logout Rejected')
			state.loading = false
			state.errors = [] as IValidationErrorResponse[]
			state.currentUser = {} as IUser
			state.isAuth = false
		})
		// === Check ====
		builder.addCase(check.pending, state => {
			console.log('Check Pending')
			state.loading = true
			state.errors = []
		})
		builder.addCase(check.fulfilled, (state, action) => {
			console.log('Check Fulfilled')
			state.success = true
			state.currentUser = action.payload.currentUser
			state.isAuth = true
			state.loading = false
		})
		builder.addCase(check.rejected, (state, action) => {
			console.log('Check Rejected', state.errors)
			state.isAuth = false
			state.currentUser = {} as IUser
			state.errors = action.payload as IValidationErrorResponse[]
			state.loading = false
		})
		// === Restore ====
		builder.addCase(restore.pending, state => {
			console.log('Restore Pending')
			state.loading = true
			state.errors = []
		})
		builder.addCase(restore.fulfilled, (state, action) => {
			console.log('Restore Fulfilled')
			state.success = true
			state.loading = false
		})
		builder.addCase(restore.rejected, (state, action) => {
			console.log('Restore Rejected', state.errors)
			state.errors = action.payload as IValidationErrorResponse[]
			state.loading = false
		})
	},
})

export const { clearError, clearSuccess } = authSlice.actions

export default authSlice.reducer
