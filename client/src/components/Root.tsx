import { Outlet } from 'react-router-dom'
import { Box, Container, CssBaseline, Typography } from '@mui/material'
import Copyright from './Copyright'
import AppBar from './AppBar'

const Root = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
			}}
		>
			<CssBaseline />
			<AppBar />
			<Container component="main" sx={{ marginY: 2 }} maxWidth="sm">
				<Outlet />
			</Container>
			<Box
				component="footer"
				sx={{
					py: 3,
					px: 2,
					mt: 'auto',
					backgroundColor: theme =>
						theme.palette.mode === 'light'
							? theme.palette.grey[200]
							: theme.palette.grey[800],
				}}
			>
				<Container maxWidth="sm">
					<Typography variant="body1" align="center">
						My sticky footer can be found here.
					</Typography>
					<Copyright />
				</Container>
			</Box>
		</Box>
	)
}

export default Root
