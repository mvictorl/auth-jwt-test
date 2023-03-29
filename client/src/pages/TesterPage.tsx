import {
	Backdrop,
	CircularProgress,
	Container,
	CssBaseline,
	Typography,
} from '@mui/material'
import { Outlet } from 'react-router-dom'

const TesterPage = () => {
	return (
		<Container>
			<CssBaseline />
			<Backdrop
				sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
				open={false}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Typography component="h1" variant="h4" align="center" marginBottom={5}>
				Tester Page
			</Typography>

			<Outlet />
		</Container>
	)
}

export default TesterPage
