import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as LinkRRD, useNavigate, useLocation } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Copyright from '../Copyright'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { AppDispatch } from '../../store'
import { login } from '../../store/actions/authActions'
import { selectIsAuth, selectErrors } from '../../store/slices/authSlice'

const theme = createTheme()

function SignIn() {
	const dispatch: AppDispatch = useDispatch()
	const isAuth = useSelector(selectIsAuth)
	const errors = useSelector(selectErrors)

	const { state, pathname } = useLocation()
	const navigate = useNavigate()

	const [username, setUsername] = useState<string>('')
	const [usernameError, setUsernameError] = useState<string>(' ')
	const [password, setPassword] = useState<string>('')
	const [passwordError, setPasswordError] = useState<string>(' ')
	const [remember, setRemember] = useState<boolean>(false)
	// const [passwordShow, setPasswordShow] = useState<boolean>(false)

	useEffect(() => {
		if (isAuth) {
			navigate(state?.from || '/')
		}
	}, [isAuth])

	useEffect(() => {
		if (errors.length > 0) {
			errors.forEach(e => {
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
		}
	}, [errors])

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		dispatch(login({ username, password, remember }))
		// const data = new FormData(event.currentTarget)
		// const objData = {
		// 	username: data.get('username')!.toString(),
		// 	password: data.get('password')!.toString(),
		// 	remember: !!data.get('remember'),
		// }

		// dispatch(login(objData))
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
							type="password"
							id="password"
							autoComplete="current-password"
							error={passwordError !== ' '}
							helperText={passwordError || ' '}
						/>
						<FormControlLabel
							control={
								<Checkbox
									value={remember}
									onChange={e => setRemember(!remember)}
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
