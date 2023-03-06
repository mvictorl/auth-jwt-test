import { useState, useEffect } from 'react'
import {
	Link as LinkRRD,
	useNavigate,
	useLocation,
	Navigate,
} from 'react-router-dom'
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
	RuleFolder as FolderIcon,
	Visibility,
	VisibilityOff,
} from '@mui/icons-material'
import Copyright from '../Copyright'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { login } from '../../store/actions/authActions'
import {
	selectCurrentUser,
	selectErrors,
	selectIsAuth,
	useAppDispatch,
	useAppSelector,
} from '../../store/hooks/stateHooks'
import { clearError } from '../../store/slices/authSlice'
import { IValidationErrorResponse } from '../../interfaces/IValidationErrorResponse'
import { addExercise } from '../../store/actions/testerActions'

const theme = createTheme()

function AddExercise() {
	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(selectIsAuth)
	const currentUser = useAppSelector(selectCurrentUser)

	const { state, pathname } = useLocation()
	const navigate = useNavigate()

	const [titleExercise, setTitleExercise] = useState<string>('')
  const [descriptionExercise, setDescriptionExercise] = useState<string>('')
	// const [usernameError, setUsernameError] = useState<string>(' ')
	// const [password, setPassword] = useState<string>('')
	// const [passwordError, setPasswordError] = useState<string>(' ')
	const [isMultipleExercise, setIsMultipleExercise] = useState<boolean>(false)

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		dispatch(
			addExercise({
				title: titleExercise,
				isMultiple: isMultipleExercise,
        description: descriptionExercise,
				authorId: currentUser.id,
			})
		)
		navigate(state?.from || '/tester/exercises')
	}

	const out = !isAuth ? (
		<Navigate to="/signin" state={{ from: pathname }} />
	) : (
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
						<FolderIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						New Exercise
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							onChange={e => setTitleExercise(e.target.value)}
							// onFocus={() => setUsernameError(' ')}
							value={titleExercise}
							margin="normal"
							required
							fullWidth
							id="title"
							label="Title of Exercise"
							name="title"
							autoComplete="title"
							// error={usernameError !== ' '}
							// helperText={usernameError || ' '}
							autoFocus
						/>
						
            <TextField
							onChange={e => setDescriptionExercise(e.target.value)}
							// onFocus={() => setUsernameError(' ')}
							value={descriptionExercise}
							margin="normal"
							required
							fullWidth
							id="description"
							label="Description of Exercise"
							name="description"
							autoComplete="description"
							// error={usernameError !== ' '}
							// helperText={usernameError || ' '}
						/>

						<FormControlLabel
							control={
								<Checkbox
									checked={isMultipleExercise}
									onChange={() => setIsMultipleExercise(!isMultipleExercise)}
									name="isMultiple"
									color="primary"
								/>
							}
							label="Multi-answer Exercise?"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Create new exercise
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	)

	return out
}

export default AddExercise
