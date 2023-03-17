import { useEffect, useState, useRef } from 'react'
import { Link as LinkRRD, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {
	selectCurrentUser,
	selectIsAuth,
	useAppDispatch,
	useAppSelector,
} from '../../store/hooks/stateHooks'
import {
	changeExercises,
	deleteExercise,
	getAllExercises,
} from '../../store/actions/testerActions'
import { styled } from '@mui/material/styles'
import {
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	IconButton,
	Link,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Tooltip,
	Typography,
} from '@mui/material'
import {
	RuleFolder as FolderIcon,
	DriveFileRenameOutline as EditIcon,
	Delete as DeleteIcon,
	AddCard as AddCardIcon,
} from '@mui/icons-material'
import DeleteDialog from './DeleteDialog'
import { IExerciseId } from '../../interfaces/IExerciseId'
import {
	useChangeExerciseMutation,
	useDeleteExerciseByIDMutation,
	useGetAllExerciseQuery,
} from '../../store/query/testerApi'
import {
	setCurrentExercise,
	clearCurrentExercise,
} from '../../store/slices/exerciseSlice'
import EditExerciseDialog from './EditExerciseDialog'

const ExerciseList = () => {
	const [
		deleteExercise,
		{ isSuccess: isDeleteSuccess, isError: isDeleteError },
	] = useDeleteExerciseByIDMutation()
	const [
		changeExercise,
		{ isSuccess: isChangeSuccess, isError: isChangeError },
	] = useChangeExerciseMutation()
	const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)
	const [candidateToDelete, setCandidateToDelete] = useState<string>('')

	const exercise = useRef({} as IExerciseId)

	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const isAuth = useAppSelector(selectIsAuth)
	const currentUser = useAppSelector(selectCurrentUser)
	// const exercises = useAppSelector(selectExercises)

	const { data, error, isLoading } = useGetAllExerciseQuery()

	const StyledDiv = styled('div')(({ theme }) => ({
		backgroundColor: theme.palette.background.paper,
	}))

	// Test Dialog Open - BEGIN
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
	const handleEditBtn = (e: IExerciseId) => {
		exercise.current = e
		setIsDialogOpen(true)
	}
	const handleDialogReturnOk = (newExercise: IExerciseId) => {
		changeExercise(newExercise)
		setIsDialogOpen(false)
		exercise.current = {} as IExerciseId
	}
	const handleDialogReturnCancel = () => {
		setIsDialogOpen(false)
		exercise.current = {} as IExerciseId
	}
	// Test Dialog Open - END

	const handleAddExercise = () => {
		setIsDialogOpen(true)
	}

	const handleDeleteDialogOk = () => {
		deleteExercise(candidateToDelete)
		setDeleteDialogOpen(false)
		setCandidateToDelete('')
	}
	const handleDeleteDialogCancel = () => {
		setDeleteDialogOpen(false)
	}

	const handleDeleteBtn = (id: string) => {
		setCandidateToDelete(id)
		setDeleteDialogOpen(true)
	}

	const viewOwnerButtons = (e: IExerciseId) => {
		if (
			isAuth &&
			(currentUser.id === e.userId || currentUser.roles.includes('ADMIN'))
		) {
			return (
				<Box>
					<Tooltip title="Edit">
						<IconButton onClick={() => handleEditBtn(e)} aria-label="edit">
							<EditIcon />
						</IconButton>
					</Tooltip>

					<Tooltip title="Delete">
						<IconButton
							onClick={() => handleDeleteBtn(e.id)}
							aria-label="delete"
						>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				</Box>
			)
		} else return null
	}

	return (
		<Container maxWidth="md">
			<DeleteDialog
				open={deleteDialogOpen}
				onCloseDialog={handleDeleteDialogCancel}
				onOkDialog={handleDeleteDialogOk}
			/>

			<Grid item xs={12} md={6}>
				{data && data.length > 0 ? (
					<>
						<Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
							Список тестов:
						</Typography>
						<StyledDiv>
							<List>
								{data.map((e: IExerciseId) => (
									<ListItem key={e.id} secondaryAction={viewOwnerButtons(e)}>
										<ListItemAvatar>
											<Avatar>
												<FolderIcon />
											</Avatar>
										</ListItemAvatar>
										<Link
											to={`/tester/exercises/${e.id}`}
											component={LinkRRD}
											underline="hover"
										>
											<ListItemText
												primary={e.title}
												secondary={e.description}
											/>
										</Link>
									</ListItem>
								))}
							</List>
						</StyledDiv>
					</>
				) : (
					<Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
						No ready tests
					</Typography>
				)}
			</Grid>
			{/* <Button
				to="/tester/exercises/add"
				state={{ from: pathname }}
				component={LinkRRD}
			>
				Add Exercise
			</Button> */}
			{isDialogOpen ? (
				<EditExerciseDialog
					open={true}
					onOkDialog={handleDialogReturnOk}
					onCancelDialog={handleDialogReturnCancel}
					exercise={exercise.current}
				/>
			) : null}

			<Button
				onClick={handleAddExercise}
				variant="contained"
				startIcon={<AddCardIcon />}
				sx={{ mt: 3 }}
			>
				Add Exercise
			</Button>
		</Container>
	)
}

export default ExerciseList
