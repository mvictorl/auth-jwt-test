import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './index.css'

import { Provider } from 'react-redux'
import { store } from './store'

import { SnackbarProvider } from 'notistack'
import ReportComplete from './components/Snackbar/MySuccess'

declare module 'notistack' {
	interface VariantOverrides {
		reportComplete: true
	}
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<SnackbarProvider
			maxSnack={5}
			Components={{
				reportComplete: ReportComplete,
			}}
		>
			<App />
		</SnackbarProvider>
	</Provider>
)
