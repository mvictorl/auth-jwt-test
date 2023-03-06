import { useState, useEffect, useLayoutEffect } from 'react'
import { Link as LinkRRD, useLocation, useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Copyright from '../Copyright'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { register } from '../../store/actions/authActions'
import {
	selectErrors,
	selectIsAuth,
	useAppDispatch,
	useAppSelector,
} from '../../store/hooks/stateHooks'
import { clearError } from '../../store/slices/authSlice'
import { IValidationErrorResponse } from '../../interfaces/IValidationErrorResponse'

const theme = createTheme()

function SignUp() {
	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(selectIsAuth)
	const errors = useAppSelector(selectErrors)

	const { state, pathname } = useLocation()
	const navigate = useNavigate()

	const [username, setUsername] = useState<string>('')
	const [usernameError, setUsernameError] = useState<string>(' ')

	const [firstName, setFirstName] = useState<string>('')
	const [firstNameError, setFirstNameError] = useState<string>(' ')

	const [lastName, setLastName] = useState<string>('')
	const [lastNameError, setLastNameError] = useState<string>(' ')

	const [email, setEmail] = useState<string>('')
	const [emailError, setEmailError] = useState<string>(' ')

	const [password, setPassword] = useState<string>('')
	const [passwordError, setPasswordError] = useState<string>(' ')

	const [passwordConfirm, setPasswordConfirm] = useState<string>('')
	const [passwordConfirmError, setPasswordConfirmError] = useState<string>(' ')

	const [passwordShow, setPasswordShow] = useState<boolean>(false)
	const [passwordConfirmShow, setPasswordConfirmShow] = useState<boolean>(false)

	useEffect(() => {
		if (isAuth) {
			navigate(state?.from || '/')
		}
	}, [isAuth])

	useEffect(() => {
		if (errors.length > 0) {
			console.log('Errors:', errors)

			errors.forEach((e: IValidationErrorResponse) => {
				switch (e.param) {
					case 'username':
						setUsernameError(e.msg)
						setUsername(e.value)
						break
					case 'email':
						setEmailError(e.msg)
						setEmail(e.value)
						break
					case 'firstName':
						setFirstNameError(e.msg)
						setFirstName(e.value)
						break
					case 'lastName':
						setLastNameError(e.msg)
						setLastName(e.value)
						break
					case 'password':
						setPasswordError(e.msg)
						setPassword(e.value)
						break
					case 'passwordConfirm':
						setPasswordConfirmError(e.msg)
						setPasswordConfirm(e.value)
						break
				}
			})
			dispatch(clearError())
		}
	}, [errors])

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		dispatch(
			register({
				username,
				email,
				firstName,
				lastName,
				password,
				passwordConfirm,
			})
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
						<Grid container columnSpacing={{ xs: 0, md: 1 }}>
							<Grid item xs={12}>
								<TextField
									onChange={e => setUsername(e.target.value)}
									onFocus={() => setUsernameError(' ')}
									value={username}
									required
									fullWidth
									id="username"
									label="User Name"
									name="username"
									error={usernameError !== ' '}
									helperText={usernameError || ' '}
									autoComplete="username"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									onChange={e => setFirstName(e.target.value)}
									onFocus={() => setFirstNameError(' ')}
									value={firstName}
									name="firstName"
									fullWidth
									id="firstName"
									label="First Name"
									error={firstNameError !== ' '}
									helperText={firstNameError || ' '}
									autoComplete="given-name"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									onChange={e => setLastName(e.target.value)}
									onFocus={() => setLastNameError(' ')}
									value={lastName}
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									error={lastNameError !== ' '}
									helperText={lastNameError || ' '}
									autoComplete="family-name"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									onChange={e => setEmail(e.target.value)}
									onFocus={() => setEmailError(' ')}
									value={email}
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									error={emailError !== ' '}
									helperText={emailError || ' '}
									autoComplete="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									onChange={e => setPassword(e.target.value)}
									onFocus={() => setPasswordError(' ')}
									value={password}
									type="password"
									required
									fullWidth
									id="password"
									label="Password"
									name="password"
									error={passwordError !== ' '}
									helperText={passwordError || ' '}
									autoComplete="new-password"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									onChange={e => setPasswordConfirm(e.target.value)}
									onFocus={() => setPasswordConfirmError(' ')}
									value={passwordConfirm}
									type="password"
									required
									fullWidth
									id="passwordConfirm"
									name="passwordConfirm"
									label="Confirm Password"
									error={passwordConfirmError !== ' '}
									helperText={passwordConfirmError || ' '}
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
