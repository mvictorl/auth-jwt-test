import { useEffect, useState } from 'react'
import { Link as LinkRRD, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {
	selectCurrentUser,
	selectExercises,
	selectIsAuth,
	useAppDispatch,
	useAppSelector,
} from '../../store/hooks/stateHooks'
import {
	changeExercises,
	deleteExercise,
	getAllExercises,
} from '../../store/actions/testerActions'
import { IExercise } from '../../interfaces/IExercise'
import { styled } from '@mui/material/styles'
import {
	Avatar,
	Box,
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

const ExerciseList = () => {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)

	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const isAuth = useAppSelector(selectIsAuth)
	const currentUser = useAppSelector(selectCurrentUser)
	const exercises = useAppSelector(selectExercises)

	const StyledDiv = styled('div')(({ theme }) => ({
		backgroundColor: theme.palette.background.paper,
	}))

	useEffect(() => {
		dispatch(getAllExercises())
	}, [])

	const handleOnClose = () => {
		setDeleteDialogOpen(false)
	}

	const handleEditBtn = (e: IExercise) => {
		navigate(`/tester/exercises/edit/${e.id}`, {
			state: {
				from: pathname,
				exercise: e,
			},
		})
	}

	const handleDeleteBtn = (id: string) => {
		setDeleteDialogOpen(true)
		// dispatch(deleteExercise({ id }))
		// dispatch(getAllExercises())
	}

	const viewOwnerButtons = (e: IExercise) => {
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
			<DeleteDialog open={deleteDialogOpen} onCloseDialog={handleOnClose} />
			<Grid item xs={12} md={6}>
				{exercises && exercises.length > 0 ? (
					<>
						<Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
							Список тестов:
						</Typography>
						<StyledDiv>
							<List>
								{exercises.map(e => (
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
