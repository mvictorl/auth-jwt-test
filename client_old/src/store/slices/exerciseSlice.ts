import { createSelector, createSlice } from '@reduxjs/toolkit'
import {
	addExercise,
	changeExercises,
	deleteExercise,
	getAllExercises,
} from '../actions/testerActions'
import { IExercise } from '../../interfaces/IExercise'
import { IExerciseFull } from '../../interfaces/IExerciseFull'

// Initial Auth State
const initialState = {
	currentExercise: {} as IExerciseFull,
}

const exerciseSlice = createSlice({
	name: 'tester',
	initialState,
	reducers: {
		setCurrentExercise(state, action) {
			state.currentExercise = action.payload
		},
		clearCurrentExercise(state) {
			state.currentExercise = {} as IExerciseFull
		},
	},
})

// export const { clearError } = testerSlice.actions

export const { setCurrentExercise, clearCurrentExercise } =
	exerciseSlice.actions

export default exerciseSlice.reducer
