import {
	Container,
	Typography,
	Button,
	CssBaseline,
	Backdrop,
	CircularProgress,
} from '@mui/material'
import { Link as LinkRRD, Outlet, useLocation } from 'react-router-dom'
import {
	selectLoadingExercise,
	useAppSelector,
} from '../store/hooks/stateHooks'

const TesterPage = () => {
	const loading = useAppSelector(selectLoadingExercise)
	const { pathname } = useLocation()

	return (
		<Container>
			<CssBaseline />
			<Backdrop
				sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
				open={loading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Typography component="h1" variant="h4" align="center" marginBottom={5}>
				Tester Page
			</Typography>
			<Button
				to="/tester/exercises/add"
				state={{ from: pathname }}
				component={LinkRRD}
			>
				Add Exercise
			</Button>
			<Outlet />
		</Container>
	)
}

export default TesterPage
