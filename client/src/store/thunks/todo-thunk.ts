import { createAsyncThunk } from '@reduxjs/toolkit'

export type Todo = {
	userId: number
	id: number
	title: string
	completed: boolean
}

export const getAllTodos = createAsyncThunk(
	'todo/getAllTodos',
	async (_, thunkApi) => {
		try {
			const response = await fetch(
				'https://jsonplaceholder.typicode.com/todos?_page=1&_limit=10'
			)
			return (await response.json()) as Todo[]
		} catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}
)
