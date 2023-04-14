import { Grid, Link, Container, Typography } from '@mui/material'
import { useLocation, Link as LinkRRD, Navigate } from 'react-router-dom'

const ErrorGetPasswordRestore = () => {
	const { state } = useLocation()

	if (!state || state.from !== 'password_restore') {
		return <Navigate to="/" replace={true} />
	}

	return (
		<Container component="main" maxWidth="xl">
			<Typography component="h1" variant="h4" align="center" marginBottom={5}>
				Password recovery code generation error
			</Typography>
			<Grid container>
				<Grid item xs>
					<Link
						to="/password_restore"
						replace
						component={LinkRRD}
						variant="body2"
						underline="hover"
						sx={{
							display: 'block',
							textAlign: 'right',
						}}
					>
						Go back
					</Link>
				</Grid>
			</Grid>
		</Container>
	)
}

export default ErrorGetPasswordRestore
