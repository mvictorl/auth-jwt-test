import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'

// import Slises

const store = configureStore({
	reducer: {
		auth: authSlice,
	},
})

export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
