import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import testerSlice from './slices/testerSlice'

// import Slises

const store = configureStore({
	reducer: {
		auth: authSlice,
		tester: testerSlice,
	},
})

export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
