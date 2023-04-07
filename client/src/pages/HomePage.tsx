import { Box } from '@mui/material'
import { useSnackbar } from 'notistack'

function HomePage() {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar()

	const handleAlert = () => {
		enqueueSnackbar(
			<>
				<Box sx={{ color: 'yellow' }}>
					HTML Content
					<br />A second line
				</Box>
			</>,
			{
				variant: 'error',
				anchorOrigin: {
					vertical: 'bottom',
					horizontal: 'right',
				},
			}
		)
	}

	return (
		<>
			<h2>Home Page</h2>
			<button onClick={handleAlert}>Alert</button>
			<button onClick={() => closeSnackbar()}>Close All</button>
			<br />
			<button
				onClick={() =>
					enqueueSnackbar('Secceful authorization!', {
						variant: 'reportSuccessEnlarged',
						// persist: true,
						title: 'Заголовок',
						details: 'Детализированное описание процесса...',
						anchorOrigin: {
							vertical: 'bottom',
							horizontal: 'right',
						},
					})
				}
			>
				Open Custom Report
			</button>
		</>
	)
}

export default HomePage
