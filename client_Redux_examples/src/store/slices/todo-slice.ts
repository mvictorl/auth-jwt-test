import { SerializedError, createSlice } from '@reduxjs/toolkit'
import { getAllTodos } from '../thunks/todo-thunk'
import { Todo } from '../thunks/todo-thunk'

const initialState = {
	todos: [] as Todo[],
	isLoading: false,
	error: '' as SerializedError,
}

export const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(getAllTodos.fulfilled, (state, action) => {
			state.todos = action.payload
			state.isLoading = false
			state.error = '' as SerializedError
		})
		builder.addCase(getAllTodos.pending, state => {
			state.todos = [] as Todo[]
			state.isLoading = true
			state.error = '' as SerializedError
		})
		builder.addCase(getAllTodos.rejected, (state, action) => {
			state.todos = [] as Todo[]
			state.isLoading = false
			state.error = action.error
		})
	},
})

export default todoSlice.reducer
