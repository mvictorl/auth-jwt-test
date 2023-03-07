import { useState } from 'react'
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
} from '@mui/icons-material'
import DeleteDialog from './DeleteDialog'
import { IExerciseId } from '../../interfaces/IExerciseId'
import {
	useDeleteExerciseByIDMutation,
	useGetAllExerciseQuery,
} from '../../store/query/testerApi'
import { IExerciseFull } from '../../interfaces/IExerciseFull'
import {
	setCurrentExercise,
	clearCurrentExercise,
} from '../../store/slices/exerciseSlice'

const ExerciseList = () => {
	const [deleteExercise, { isSuccess, isError }] =
		useDeleteExerciseByIDMutation()
	const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)
	const [candidateToDelete, setCandidateToDelete] = useState<string>('')

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

	// const handleChooseExercise = (id: string) => {
	// 	dispatch(setCurrentExercise(id))
	// }

	const handleOnOk = () => {
		deleteExercise(candidateToDelete)
		setDeleteDialogOpen(false)
		setCandidateToDelete('')
	}
	const handleOnClose = () => {
		setDeleteDialogOpen(false)
	}

	const handleEditBtn = (e: IExerciseId) => {
		navigate(`/tester/exercises/edit/${e.id}`, {
			state: {
				from: pathname,
				exercise: e,
			},
		})
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
				onCloseDialog={handleOnClose}
				onOkDialog={handleOnOk}
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
		</Container>
		// <>
		// 	{exercises.length > 0 ? (
		// 		<ul>
		// 			{exercises.map((e: IExercise) => {
		// 				return <li key={e.id}>{e.title}</li>
		// 			})}
		// 		</ul>
		// 	) : loading ? (
		// 		<p>Loading...</p>
		// 	) : (
		// 		<p>Empty</p>
		// 	)}
		// </>
	)
}

export default ExerciseList
