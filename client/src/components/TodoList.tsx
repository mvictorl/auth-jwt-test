import React from 'react'
import {
	selectTodoError,
	selectTodoIsLoading,
	selectTodos,
	useAppDispatch,
	useAppSelector,
} from '../store/hooks'
import { getAllTodos } from '../store/thunks/todo-thunk'

const TodoList = () => {
	const dispatch = useAppDispatch()
	const todos = useAppSelector(selectTodos)
	const isLoading = useAppSelector(selectTodoIsLoading)
	const error = useAppSelector(selectTodoError)

	const handleGetTodos = () => {
		dispatch(getAllTodos())
	}

	if (isLoading) return <h2>Loading...</h2>
	if (error) return <h2>Error occurs!</h2>
	return (
		<div>
			<button onClick={handleGetTodos}>Get ToDos</button>
			<ol style={{ textAlign: 'left' }}>
				{todos?.map(todo => (
					<li key={todo.id}>{todo.title}</li>
				))}
			</ol>
		</div>
	)
}

export default TodoList
