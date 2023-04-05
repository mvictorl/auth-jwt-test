import { Grid, Link, Container, Typography } from '@mui/material'
import { Link as LinkRRD } from 'react-router-dom'

const PasswordRestoreCode = () => (
	<Container component="main" maxWidth="xl">
		<Typography component="h1" variant="h4" align="center" marginBottom={5}>
			Password Restore Code successfully generate
		</Typography>
		<Typography component="h1" variant="h6" align="center" marginBottom={5}>
			You need to follow the link in the email sent to your inbox to confirm
			your password change
		</Typography>
		<Grid container>
			<Grid item xs>
				<Link
					to="/"
					component={LinkRRD}
					variant="body2"
					sx={{
						display: 'block',
						textAlign: 'right',
					}}
				>
					Go to home...
				</Link>
			</Grid>
		</Grid>
	</Container>
)

export default PasswordRestoreCode
