import { Grid, Link, Container, Typography } from '@mui/material'
import { Link as LinkRRD, Outlet } from 'react-router-dom'

const TesterPage = () => (
	<Container component="main" maxWidth="xl">
		<Typography component="h1" variant="h4" align="center" marginBottom={5}>
			Tester Page
		</Typography>
		<Outlet />
	</Container>
)

export default TesterPage
