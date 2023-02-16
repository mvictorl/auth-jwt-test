import { useDispatch } from 'react-redux'
import { Link as LinkRRD, useLocation, useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Copyright from '../Copyright'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { AppDispatch } from '../../store'
import { register } from '../../store/actions/authActions'

const theme = createTheme()

function SignUp() {
	const dispatch: AppDispatch = useDispatch()

	const { state, pathname } = useLocation() || { from: '/' }
	const navigate = useNavigate()

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		const objData = {
			username: data.get('username')!.toString(),
			email: data.get('email')!.toString(),
			firstName: data.get('firstName')?.toString() || '',
			lastName: data.get('lastName')?.toString() || '',
			password: data.get('password')!.toString(),
			passwordConfirm: data.get('passwordConfirm')!.toString(),
		}

		dispatch(register(objData)).then(() =>
			navigate(state?.from ? state.from : '/')
		)
	}

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="username"
									label="User Name"
									name="username"
									autoComplete="username"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									name="firstName"
									fullWidth
									id="firstName"
									label="First Name"
									autoComplete="given-name"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="family-name"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="passwordConfirm"
									label="Confirm Password"
									type="password"
									id="passwordConfirm"
									autoComplete="new-password"
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link
									to="/signin"
									state={{ from: pathname }}
									component={LinkRRD}
									variant="body2"
								>
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	)
}

export default SignUp
