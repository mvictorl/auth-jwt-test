import { RuleFolder as FolderIcon } from '@mui/icons-material'
import {
	Avatar,
	Box,
	Button,
	Checkbox,
	Container,
	CssBaseline,
	FormControlLabel,
	TextField,
	Typography,
} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import {
	selectCurrentUser,
	selectIsAuth,
	useAppDispatch,
	useAppSelector,
} from '../../store/hooks/stateHooks'
import { useAddNewExerciseMutation } from '../../store/query/testerApi'

const theme = createTheme()

function AddExercise() {
	const [addExercise, { error, isLoading }] = useAddNewExerciseMutation()

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
		addExercise({
			title: titleExercise,
			isMultiple: isMultipleExercise,
			description: descriptionExercise,
			userId: currentUser.id,
		})
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
