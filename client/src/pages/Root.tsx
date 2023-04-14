import React, { useMemo } from 'react'
import {
	Backdrop,
	CircularProgress,
	Container,
	CssBaseline,
} from '@mui/material'
import { Outlet } from 'react-router-dom'
import MainMenu from '../components/MainMenu/MainMenu'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles'
import { useAppSelector } from '../store/hooks'
import { QueryStatus } from '@reduxjs/toolkit/dist/query'
// import { enUS, ruRU } from '@mui/material/locale'
import * as locales from '@mui/material/locale'
import { selectLocale } from '../store/slices/local-slice'
import { useSelector } from 'react-redux'

// type SupportedLocales = keyof typeof locales

function Root() {
	const theme = useTheme()
	const locale = useSelector(selectLocale)
	const themeWithLocale = useMemo(
		() => createTheme(theme, locales[locale]),
		[locale, theme]
	)

	const isLoading = useAppSelector(state => {
		return Object.values(state.tester.queries).some(query => {
			return query && query.status === QueryStatus.pending
		})
	})

	return (
		<ThemeProvider theme={themeWithLocale}>
			<CssBaseline />
			<MainMenu />
			<Container maxWidth="xl" sx={{ pt: 3 }}>
				<Backdrop
					sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
					open={isLoading}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
				<Outlet />
			</Container>
		</ThemeProvider>
	)
}

export default Root
