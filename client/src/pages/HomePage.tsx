import React from 'react'
import { useSnackbar } from 'notistack'

function HomePage() {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar()

	const handleAlert = () => {
		enqueueSnackbar('ALARM!!!', {
			variant: 'error',
			anchorOrigin: {
				vertical: 'bottom',
				horizontal: 'right',
			},
		})
	}

	return (
		<>
			<h2>Home Page</h2>
			<button onClick={handleAlert}>Alert</button>
			<button onClick={() => closeSnackbar()}>Close All</button>
		</>
	)
}

export default HomePage
