import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import counterReducer from './slices/counter-slice'
import { userApi } from './APIs/userApi'
import todoReducer from './slices/todo-slice'
import authReducer from './slices/auth-slice'

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		todo: todoReducer,
		auth: authReducer,
		// RTK Query reducer:
		[userApi.reducerPath]: userApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(userApi.middleware),
})
// For RTK Query 'refetchOnFocus'/'refetchOnReconnect' parameters
setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
