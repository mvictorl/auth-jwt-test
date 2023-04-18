import { useState, useEffect, FormEvent } from 'react'
import { useNavigate, useLocation, Link as LinkRRD } from 'react-router-dom'
// @mui
import {
	Container,
	Link,
	Stack,
	IconButton,
	InputAdornment,
	TextField,
	Checkbox,
	FormControlLabel,
	Box,
	Typography,
	Avatar,
	Grid,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
// @mui/icons-material
import LockOpenIcon from '@mui/icons-material/LockOpenOutlined'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
// Auth Logic
import {
	selectAuthErrors,
	selectAuthIsAuth,
	selectAuthLoading,
	selectAuthSuccess,
	useAppDispatch,
	useAppSelector,
} from '../../store/hooks'
import { login } from '../../store/thunks/auth-thunk'
import { clearError, clearSuccess } from '../../store/slices/auth-slice'
import { IValidationErrorResponse } from '../../interfaces/IValidationErrorResponse'

import { useSnackbar } from 'notistack'
import ReportSuccessEnlarged from '../Snackbar/ReportSuccessEnlarged'
import { useTranslation } from 'react-i18next'

// ----------------------------------------------------------------------

const SignIn = () => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(selectAuthIsAuth)
	const isLoading = useAppSelector(selectAuthLoading)
	const errors = useAppSelector(selectAuthErrors)
	const isSuccess = useAppSelector(selectAuthSuccess)

	const { state, pathname } = useLocation()
	const navigate = useNavigate()

	const [showPassword, setShowPassword] = useState(false)

	const [nickname, setNickname] = useState<string>('')
	const [nicknameError, setNicknameError] = useState<string>(' ')
	const [password, setPassword] = useState<string>('')
	const [passwordError, setPasswordError] = useState<string>(' ')
	const [remember, setRemember] = useState<boolean>(false)

	const { enqueueSnackbar, closeSnackbar } = useSnackbar()

	useEffect(() => {
		if (isAuth) {
			navigate(state?.from || '/', { replace: true })
		}
	}, [isAuth])

	useEffect(() => {
		if (isSuccess && isAuth) {
			enqueueSnackbar(t('auth.successful'), {
				variant: 'success',
			})
			dispatch(clearSuccess())
		}
	}, [isSuccess, isAuth])

	useEffect(() => {
		if (errors.length > 0) {
			errors.forEach((e: IValidationErrorResponse) => {
				switch (e.param) {
					case 'username':
						setNicknameError(e.msg)
						setNickname(e.value)
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

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		dispatch(login({ username: nickname, password, remember }))
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
						<Avatar variant="rounded" sx={{ m: 1, bgcolor: 'success.main' }}>
							<LockOpenIcon fontSize="large" />
						</Avatar>
						<Typography variant="h3" sx={{ my: 2 }}>
							{t('auth.sign-in')}
						</Typography>
					</Box>

					<TextField
						value={nickname}
						required
						onChange={e => setNickname(e.target.value)}
						onFocus={() => setNicknameError(' ')}
						name="nickname"
						label={t('auth.nick-name')}
						fullWidth
						margin="dense"
						autoComplete="nickame"
						error={nicknameError !== ' '}
						helperText={nicknameError || ' '}
					/>

					<TextField
						value={password}
						required
						onChange={e => setPassword(e.target.value)}
						onFocus={() => setPasswordError(' ')}
						name="password"
						label={t('auth.password')}
						type={showPassword ? 'text' : 'password'}
						fullWidth
						margin="dense"
						autoComplete="password"
						error={passwordError !== ' '}
						helperText={passwordError || ' '}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={() => setShowPassword(!showPassword)}
										edge="end"
									>
										{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</Stack>

				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					sx={{ mb: 2 }}
				>
					<FormControlLabel
						label={t('auth.remember')}
						control={
							<Checkbox
								name="remember"
								checked={remember}
								onChange={() => setRemember(!remember)}
							/>
						}
					/>
				</Stack>

				<LoadingButton
					fullWidth
					size="large"
					type="submit"
					variant="contained"
					loading={isLoading}
					// sx={{ bgcolor: 'success.main' }}
				>
					{t('auth.login')}
				</LoadingButton>
			</Box>
			<Grid container sx={{ mt: 2 }}>
				<Grid item xs>
					<Link
						to="/restore"
						state={{ from: pathname }}
						component={LinkRRD}
						variant="subtitle2"
						underline="hover"
					>
						{t('auth.forgot-pass')}
					</Link>
				</Grid>
				<Grid item>
					<Link
						to="/signup"
						state={{ from: pathname }}
						component={LinkRRD}
						variant="subtitle2"
						underline="hover"
					>
						{t('auth.dont-have-account')}
					</Link>
				</Grid>
			</Grid>
		</Container>
	)
}

export default SignIn
