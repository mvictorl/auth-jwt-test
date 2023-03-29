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
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	IconButton,
	Link,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material'
import {
	RuleFolder as FolderIcon,
	DriveFileRenameOutline as EditIcon,
	Delete as DeleteIcon,
	AddCard as AddCardIcon,
} from '@mui/icons-material'
import DeleteExerciseDialog from './DeleteExerciseDialog'
import { IExerciseId } from '../../interfaces/IExerciseId'
import {
	useAddNewExerciseMutation,
	useChangeExerciseMutation,
	useDeleteExerciseByIDMutation,
	useGetAllExerciseQuery,
} from '../../store/query/testerApi'
import {
	setCurrentExercise,
	clearCurrentExercise,
} from '../../store/slices/exerciseSlice'
import AddExerciseDialog from './AddExerciseDialog'
import { IExercise } from '../../interfaces/IExercise'
import EditExerciseDialog from './EditExerciseDialog'

const ExerciseList = () => {
	const [addExercise, { isSuccess: isAddSuccess, isError: isAddError }] =
		useAddNewExerciseMutation()
	const [
		deleteExercise,
		{ isSuccess: isDeleteSuccess, isError: isDeleteError },
	] = useDeleteExerciseByIDMutation()
	const [
		changeExercise,
		{ isSuccess: isChangeSuccess, isError: isChangeError },
	] = useChangeExerciseMutation()

	type ExerciseType = {
		title: string
		description: string
		isMultiple: boolean
	}

	const exercise = useRef({} as ExerciseType)

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

	// ===== Add Dialog Open - BEGIN
	const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)

	const handleAddExercise = () => {
		setIsAddDialogOpen(true)
	}

	const handleAddDialogOk = (newExercise: {
		title: string
		description: string
		isMultiple: boolean
	}) => {
		addExercise({ ...newExercise, userId: currentUser.id })
		setIsAddDialogOpen(false)
	}
	const handleAddDialogCancel = () => {
		setIsAddDialogOpen(false)
	}
	// ===== Add Dialog Open - END

	// ===== Edit Dialog Open - BEGIN
	const [isEditDialogOpen, setIsEditDialogOpen] = useState<IExerciseId | false>(
		false
	)

	const handleEditDialogOk = (newExercise: {
		id: string
		title: string
		description: string
		isMultiple: boolean
	}) => {
		changeExercise({ ...newExercise, userId: currentUser.id })
		setIsEditDialogOpen(false)
	}
	const handleEditDialogCancel = () => {
		setIsEditDialogOpen(false)
	}
	// ===== Edit Dialog Open - END

	// ===== Delete Dialog Open - BEGIN
	const [deleteDialogOpen, setDeleteDialogOpen] = useState<string | false>(
		false
	)

	const handleDeleteDialogOk = () => {
		if (typeof deleteDialogOpen === 'string') {
			deleteExercise(deleteDialogOpen)
		}
		setDeleteDialogOpen(false)
	}

	const handleDeleteDialogCancel = () => {
		setDeleteDialogOpen(false)
	}
	// ===== Delete Dialog Open - END

	const viewOwnerButtons = (e: IExerciseId) => {
		if (
			isAuth &&
			(currentUser.id === e.userId || currentUser.roles.includes('ADMIN'))
		) {
			return (
				<Box>
					<Tooltip title="Edit">
						<IconButton
							onClick={() => setIsEditDialogOpen(e)}
							aria-label="edit"
						>
							<EditIcon />
						</IconButton>
					</Tooltip>

					<Tooltip title="Delete">
						<IconButton
							onClick={() => setDeleteDialogOpen(e.id)}
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
			<AddExerciseDialog
				open={isAddDialogOpen}
				onOkDialog={handleAddDialogOk}
				onCancelDialog={handleAddDialogCancel}
			/>

			<EditExerciseDialog
				open={!!isEditDialogOpen}
				onOkDialog={handleEditDialogOk}
				onCancelDialog={handleEditDialogCancel}
				exercise={isEditDialogOpen ? isEditDialogOpen : undefined}
			/>

			<DeleteExerciseDialog
				open={!!deleteDialogOpen}
				onCloseDialog={handleDeleteDialogCancel}
				onOkDialog={handleDeleteDialogOk}
			/>

			<Grid item xs={12} md={6}>
				{data && data.length > 0 ? (
					<Box>
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
					</Box>
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
