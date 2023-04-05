import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '..'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const selectTodos = (state: RootState) => state.todo.todos
export const selectTodoIsLoading = (state: RootState) => state.todo.isLoading
export const selectTodoError = (state: RootState) => state.todo.error

export const selectAuthIsAuth = (state: RootState) => state.auth.isAuth
export const selectAuthCurrentUser = (state: RootState) =>
	state.auth.currentUser
export const selectAuthLoading = (state: RootState) => state.auth.loading
export const selectAuthErrors = (state: RootState) => state.auth.errors
export const selectAuthSuccess = (state: RootState) => state.auth.success
