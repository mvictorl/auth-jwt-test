import { createSlice } from '@reduxjs/toolkit'
import { IExercise } from '../../interfaces/IExercise'
import {
	addExercise,
	changeExercises,
	deleteExercise,
	getAllExercises,
} from '../actions/testerActions'

// Initial Auth State
const initialState = {
	exercises: [] as IExercise[],
	currentExercise: {} as IExercise,
	loading: false,
	success: false,
	// errors: [] as IValidationErrorResponse[],
}

const testerSlice = createSlice({
	name: 'tester',
	initialState,
	reducers: {},
	extraReducers(builder) {
		// === Get All Exercises ====
		builder.addCase(getAllExercises.pending, state => {
			console.log('Get All Exercises pending')
			state.loading = true
		})
		builder.addCase(getAllExercises.fulfilled, (state, action) => {
			console.log('Get All Exercises fulfilled')
			state.loading = false
			state.success = true
			state.exercises = action.payload
		})
		builder.addCase(getAllExercises.rejected, (state, action) => {
			console.log('Get All Exercises rejected', action.error)
			state.loading = false
			// state.errors = action.payload as IValidationErrorResponse[]
			// state.isAuth = false
			state.exercises = []
		})

		// === Add Exercise ====
		builder.addCase(addExercise.pending, state => {
			console.log('Add Exercise pending')
			state.loading = true
		})
		builder.addCase(addExercise.fulfilled, state => {
			console.log('Add Exercise fulfilled')
			state.loading = false
			state.success = true
		})
		builder.addCase(addExercise.rejected, (state, action) => {
			console.log('Add Exercise rejected', action.error)
			state.loading = false
			state.currentExercise = {} as IExercise
		})

		// === Change Exercise ====
		builder.addCase(changeExercises.pending, state => {
			console.log('Change Exercise pending')
			state.loading = true
		})
		builder.addCase(changeExercises.fulfilled, state => {
			console.log('Change Exercise fulfilled')
			state.loading = false
			state.success = true
		})
		builder.addCase(changeExercises.rejected, (state, action) => {
			console.log('Change Exercise rejected', action.error)
			state.loading = false
			state.currentExercise = {} as IExercise
		})

		// === Delete Exercise ====
		builder.addCase(deleteExercise.pending, state => {
			console.log('Delete Exercise pending')
			state.loading = true
		})
		builder.addCase(deleteExercise.fulfilled, state => {
			console.log('Delete Exercise fulfilled')
			state.loading = false
			state.success = true
		})
		builder.addCase(deleteExercise.rejected, (state, action) => {
			console.log('Delete Exercise rejected', action.error)
			state.loading = false
			state.currentExercise = {} as IExercise
		})
		// // === Login ====
		// builder.addCase(login.pending, state => {
		// 	state.isAuth = false
		// 	state.loading = true
		// 	state.errors = []
		// })
		// builder.addCase(login.fulfilled, (state, action) => {
		// 	state.success = true
		// 	state.currentUser = action.payload.currentUser
		// 	state.isAuth = true
		// 	state.loading = false
		// })
		// builder.addCase(login.rejected, (state, action) => {
		// 	state.isAuth = false
		// 	state.currentUser = {} as IUser
		// 	state.errors = action.payload as IValidationErrorResponse[]
		// 	console.log('Login Reject', state.errors)
		// 	state.loading = false
		// })
		// // === Logout ====
		// builder.addCase(logout.pending, state => {
		// 	console.log('Logout pending')
		// 	state.loading = true
		// 	state.errors = []
		// })
		// builder.addCase(logout.fulfilled, state => {
		// 	console.log('Logout fulfilled')
		// 	state.loading = false
		// 	state.success = true
		// 	state.errors = [] as IValidationErrorResponse[]
		// 	state.isAuth = false
		// 	state.currentUser = {} as IUser
		// })
		// builder.addCase(logout.rejected, (state, action) => {
		// 	console.log('Logout rejected')
		// 	state.loading = false
		// 	state.errors = [] as IValidationErrorResponse[]
		// 	state.currentUser = {} as IUser
		// 	state.isAuth = false
		// })
	},
})

// export const { clearError } = testerSlice.actions

export default testerSlice.reducer
