import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

import * as locales from '@mui/material/locale'

export type SupportedLocales = keyof typeof locales

export interface LocaleState {
	value: SupportedLocales
}

const initialState: LocaleState = {
	value: 'enUS',
}

export const localeSlice = createSlice({
	name: 'locale',
	initialState,
	reducers: {
		setLocale: (state, action: PayloadAction<SupportedLocales>) => {
			state.value = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { setLocale } = localeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLocale = (state: RootState) => state.locale.value

export default localeSlice.reducer
