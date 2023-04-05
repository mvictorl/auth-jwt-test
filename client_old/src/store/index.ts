import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import exerciseSlice from './slices/exerciseSlice'

import { testerApi } from './query/testerApi'
import { setupListeners } from '@reduxjs/toolkit/query'

// import Slises

const store = configureStore({
	reducer: {
		auth: authSlice,
		// exercise: exerciseSlice,
		[testerApi.reducerPath]: testerApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(testerApi.middleware),
})

setupListeners(store.dispatch)

export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
