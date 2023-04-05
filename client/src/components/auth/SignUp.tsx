import { FormEvent, useEffect, useState } from 'react'
import { Link as LinkRRD, useLocation, useNavigate } from 'react-router-dom'
// @mui
import LoadingButton from '@mui/lab/LoadingButton'
import {
	Avatar,
	Box,
	Container,
	Grid,
	Link,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
// @mui/icons-material
import PersonAddIcon from '@mui/icons-material/PersonAdd'
// Auth Logic
import { IValidationErrorResponse } from '../../interfaces/IValidationErrorResponse'
import {
	selectAuthErrors,
	selectAuthIsAuth,
	selectAuthLoading,
	useAppDispatch,
	useAppSelector,
} from '../../store/hooks'
import { clearError } from '../../store/slices/auth-slice'
import { register } from '../../store/thunks/auth-thunk'

// ----------------------------------------------------------------------

const SignUp = () => {
	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(selectAuthIsAuth)
	const isLoading = useAppSelector(selectAuthLoading)
	const errors = useAppSelector(selectAuthErrors)

	const { state, pathname } = useLocation()
	const navigate = useNavigate()

	const [firstName, setfirstName] = useState<string>('')
	const [firstNameError, setFirstNameError] = useState<string>(' ')

	const [lastName, setlastName] = useState<string>('')
	const [lastNameError, setLastNameError] = useState<string>(' ')

	const [nickname, setNickname] = useState<string>('')
	const [nicknameError, setNicknameError] = useState<string>(' ')

	const [email, setEmail] = useState<string>('')
	const [emailError, setEmailError] = useState<string>(' ')

	const [password, setPassword] = useState<string>('')
	const [passwordError, setPasswordError] = useState<string>(' ')

	const [passwordConfirm, setPasswordConfirm] = useState<string>('')
	const [passwordConfirmError, setPasswordConfirmError] = useState<string>(' ')

	useEffect(() => {
		if (isAuth) {
			navigate(state?.from || '/', { replace: true })
		}
	}, [isAuth])

	useEffect(() => {
		if (errors.length > 0) {
			errors.forEach((e: IValidationErrorResponse) => {
				switch (e.param) {
					case 'firstName':
						setFirstNameError(e.msg)
						setfirstName(e.value)
						break
					case 'lastName':
						setLastNameError(e.msg)
						setlastName(e.value)
						break
					case 'username':
						setNicknameError(e.msg)
						setNickname(e.value)
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

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		dispatch(
			register({
				firstName,
				lastName,
				username: nickname,
				email,
				password,
				passwordConfirm,
			})
		)
	}

	return (
		<Container maxWidth="xs" sx={{ mt: 5 }}>
			<Box component="form" onSubmit={handleSubmit} noValidate>
				<Stack>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							flexDirection: 'column',
						}}
					>
						<Avatar variant="rounded" sx={{ m: 1, bgcolor: 'secondary.light' }}>
							<PersonAddIcon fontSize="large" />
						</Avatar>
						<Typography variant="h3" sx={{ my: 2 }}>
							Sign Up
						</Typography>
					</Box>
					<Stack
						direction={{ xs: 'column', sm: 'row' }}
						spacing={{ sm: 2 }}
						alignItems="baseline"
					>
						<TextField
							value={firstName}
							onChange={e => setfirstName(e.target.value)}
							onFocus={() => setFirstNameError(' ')}
							name="firstName"
							label="First name"
							fullWidth
							margin="dense"
							autoComplete="firstName"
							error={firstNameError !== ' '}
							helperText={firstNameError || ' '}
						/>
						<TextField
							value={lastName}
							onChange={e => setlastName(e.target.value)}
							onFocus={() => setLastNameError(' ')}
							name="lastName"
							label="Last name"
							fullWidth
							margin="dense"
							autoComplete="lastName"
							error={lastNameError !== ' '}
							helperText={lastNameError || ' '}
						/>
					</Stack>

					<TextField
						value={nickname}
						required
						onChange={e => setNickname(e.target.value)}
						onFocus={() => setNicknameError(' ')}
						name="nickname"
						label="Nick name"
						fullWidth
						margin="dense"
						autoComplete="username"
						error={nicknameError !== ' '}
						helperText={nicknameError || ' '}
					/>

					<TextField
						value={email}
						required
						onChange={e => setEmail(e.target.value)}
						onFocus={() => setEmailError(' ')}
						name="email"
						label="Email"
						fullWidth
						margin="dense"
						autoComplete="email"
						error={emailError !== ' '}
						helperText={emailError || ' '}
					/>

					<TextField
						value={password}
						required
						onChange={e => setPassword(e.target.value)}
						onFocus={() => setPasswordError(' ')}
						name="password"
						label="Password"
						type="password"
						fullWidth
						margin="dense"
						autoComplete="password"
						error={passwordError !== ' '}
						helperText={passwordError || ' '}
					/>

					<TextField
						value={passwordConfirm}
						required
						onChange={e => setPasswordConfirm(e.target.value)}
						onFocus={() => setPasswordConfirmError(' ')}
						name="passwordConfirm"
						label="Confirm password"
						type="password"
						fullWidth
						margin="dense"
						autoComplete="passwordConfirm"
						error={passwordConfirmError !== ' '}
						helperText={passwordConfirmError || ' '}
					/>
				</Stack>

				<LoadingButton
					fullWidth
					size="large"
					type="submit"
					variant="contained"
					loading={isLoading}
					// sx={{ bgcolor: 'secondary.light' }}
				>
					Login
				</LoadingButton>
			</Box>
			<Grid container sx={{ mt: 2 }}>
				<Grid item xs></Grid>
				<Grid item>
					<Link
						to="/signin"
						state={{ from: pathname }}
						component={LinkRRD}
						variant="subtitle2"
						underline="hover"
					>
						{'Do you already have an account? Sign In'}
					</Link>
				</Grid>
			</Grid>
		</Container>
	)
}

export default SignUp
