import { useState, useEffect } from 'react'
import { Link as LinkRRD, useNavigate, useLocation } from 'react-router-dom'
import {
	Avatar,
	Button,
	Box,
	Checkbox,
	CssBaseline,
	Container,
	Grid,
	FormControlLabel,
	IconButton,
	InputAdornment,
	Link,
	TextField,
	Typography,
} from '@mui/material'
import {
	LockOutlined as LockOutlinedIcon,
	Visibility,
	VisibilityOff,
} from '@mui/icons-material'
import Copyright from '../Copyright'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { login } from '../../store/actions/authActions'
import {
	selectErrors,
	selectIsAuth,
	useAppDispatch,
	useAppSelector,
} from '../../store/hooks/stateHooks'
import { clearError } from '../../store/slices/authSlice'
import { IValidationErrorResponse } from '../../interfaces/IValidationErrorResponse'

const theme = createTheme()

function SignIn() {
	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(selectIsAuth)
	const errors = useAppSelector(selectErrors)

	const { state, pathname } = useLocation()
	const navigate = useNavigate()

	const [username, setUsername] = useState<string>('')
	const [usernameError, setUsernameError] = useState<string>(' ')
	const [password, setPassword] = useState<string>('')
	const [passwordError, setPasswordError] = useState<string>(' ')
	const [remember, setRemember] = useState<boolean>(false)
	const [passwordShow, setPasswordShow] = useState<boolean>(false)

	useEffect(() => {
		if (isAuth) {
			navigate(state?.from || '/')
		}
	}, [isAuth])

	useEffect(() => {
		if (errors.length > 0) {
			errors.forEach((e: IValidationErrorResponse) => {
				switch (e.param) {
					case 'username':
						setUsernameError(e.msg)
						setUsername(e.value)
						break
					case 'password':
						setPasswordError(e.msg)
						setPassword(e.value)
						break
				}
			})
			dispatch(clearError())
		}
	}, [errors])

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		dispatch(login({ username, password, remember }))
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
						Sign in
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							onChange={e => setUsername(e.target.value)}
							onFocus={() => setUsernameError(' ')}
							value={username}
							margin="normal"
							required
							fullWidth
							id="username"
							label="User Name"
							name="username"
							autoComplete="username"
							error={usernameError !== ' '}
							helperText={usernameError || ' '}
							autoFocus
						/>
						<TextField
							onChange={e => setPassword(e.target.value)}
							onFocus={() => setPasswordError(' ')}
							value={password}
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type={passwordShow ? 'text' : 'password'}
							id="password"
							autoComplete="current-password"
							error={passwordError !== ' '}
							helperText={passwordError || ' '}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={() => setPasswordShow(!passwordShow)}
											edge="end"
										>
											{passwordShow ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={remember}
									onChange={() => setRemember(!remember)}
									name="remember"
									color="primary"
								/>
							}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link
									to="/restore"
									state={{ from: pathname }}
									component={LinkRRD}
									variant="body2"
								>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link
									to="/signup"
									state={{ from: pathname }}
									component={LinkRRD}
									variant="body2"
								>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	)
}

export default SignIn
