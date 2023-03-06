import { useState } from 'react'
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
	FormControlLabel,
	TextField,
	Typography,
} from '@mui/material'
import { DriveFileRenameOutline as EditIcon } from '@mui/icons-material'
import Copyright from '../Copyright'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
	selectCurrentUser,
	selectErrors,
	selectIsAuth,
	useAppDispatch,
	useAppSelector,
} from '../../store/hooks/stateHooks'
import { clearError } from '../../store/slices/authSlice'
import { IValidationErrorResponse } from '../../interfaces/IValidationErrorResponse'
import { changeExercises } from '../../store/actions/testerActions'

const theme = createTheme()

function EditExercise() {
	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(selectIsAuth)
	const currentUser = useAppSelector(selectCurrentUser)

	const { state, pathname } = useLocation()
	const navigate = useNavigate()

	const [titleExercise, setTitleExercise] = useState<string>(
		state.exercise.title
	)
	const [descriptionExercise, setDescriptionExercise] = useState<string>(
		state.exercise.description
	)
	// const [usernameError, setUsernameError] = useState<string>(' ')
	// const [password, setPassword] = useState<string>('')
	// const [passwordError, setPasswordError] = useState<string>(' ')
	const [isMultipleExercise, setIsMultipleExercise] = useState<boolean>(
		state.exercise.isMultiple
	)

	// useEffect(() => {
	// 	setTitleExercise()
	// 	setIsMultipleExercise()
	// }, [])

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		dispatch(
			changeExercises({
				id: state.exercise.id,
				title: titleExercise,
				isMultiple: isMultipleExercise,
				description: descriptionExercise,
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
						<EditIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Edit Exercise
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
							Save changes
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	)

	return out
}

export default EditExercise
