import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, IRootState } from '..'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector

export const selectIsAuth = (state: IRootState) => state.auth.isAuth
export const selectCurrentUser = (state: IRootState) => state.auth.currentUser
export const selectLoading = (state: IRootState) => state.auth.loading
export const selectSuccess = (state: IRootState) => state.auth.success
export const selectErrors = (state: IRootState) => state.auth.errors

export const selectCurrentExercises = (state: IRootState) =>
	state.exercise.currentExercise
