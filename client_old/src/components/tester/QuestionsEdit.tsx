import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	IconButton,
	List,
	ListItem,
	Paper,
	TextField,
	Typography,
} from '@mui/material'
import {
	selectCurrentExercises,
	selectCurrentUser,
	selectIsAuth,
	useAppSelector,
} from '../../store/hooks/stateHooks'

import {
	ExpandMore as ExpandMoreIcon,
	AddCard as AddCardIcon,
	DriveFileRenameOutline as RenameOutlineIcon,
	Check as CheckIcon,
	Cancel as CancelIcon,
	TaskAlt as TaskAltIcon,
	HighlightOff as HighlightOffIcon,
} from '@mui/icons-material'
import EditExerciseDialog from './EditExerciseDialog'
import { useAddQuestionToExerciseMutation } from '../../store/query/testerApi'

const QuestionsEdit = () => {
	const exercise = useAppSelector(selectCurrentExercises)
	const isAuth = useAppSelector(selectIsAuth)
	const currentUser = useAppSelector(selectCurrentUser)
	const navigate = useNavigate()
	const { state, pathname } = useLocation()

	const [addQuestion, { isSuccess, isError }] =
		useAddQuestionToExerciseMutation()

	const [expanded, setExpanded] = useState<string | false>(false)
	const [isAnswerEdited, setIsAnswerEdited] = useState<string | false>(false)

	// const [] = useState<>()
	// const [] = useState<>()
	// const [] = useState<>()

	const handleChange =
		(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpanded(isExpanded ? panel : false)
		}

	const handleQuestionEdit = (event: React.SyntheticEvent, panel: string) => {
		event.stopPropagation()
	}

	// const handleMouseOn = (answer: string) => {
	// 	setIsAnswerEdited(answer)
	// }
	// const handleMouseOff = () => {
	// 	setIsAnswerEdited(false)
	// }

	const handleAddQuestion = () => {
		addQuestion({
			id: exercise.id,
			newQuestion: { text: 'Test Question Text' },
		})
	}

	useEffect(() => {
		if (!isAuth) {
			return navigate(state?.from || '/')
		}
	}, [isAuth])

	return (
		<>
			{exercise.questions?.map(q => (
				<Accordion
					key={q.id}
					expanded={expanded === q.id}
					onChange={handleChange(q.id)}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls={`${q.id}-content`}
						id={`${q.id}-header`}
					>
						<Typography sx={{ flexShrink: 0, alignSelf: 'center' }}>
							{q.text}
						</Typography>

						<IconButton
							color="primary"
							sx={{ ml: 1 }}
							onClick={e => handleQuestionEdit(e, q.id)}
						>
							<RenameOutlineIcon />
						</IconButton>
					</AccordionSummary>
					<AccordionDetails>
						<Paper elevation={2} sx={{ py: 0.5, px: 3 }}>
							<List>
								{q?.answers?.map((a, i) => (
									<ListItem
										key={a.id}
										// onMouseEnter={() => handleMouseOn(a.id)}
										// onMouseLeave={handleMouseOff}
										sx={{ cursor: 'context-menu' }}
									>
										{i + 1}.&nbsp;{a.text}{' '}
										{a.isCorrect ? (
											<TaskAltIcon color="success" sx={{ ml: 1 }} />
										) : (
											<HighlightOffIcon color="warning" sx={{ ml: 1 }} />
										)}
										{/* {isAnswerEdited === a.id ? (
											<IconButton
												color="primary"
												sx={{ ml: 1 }}
												onClick={() => {}}
											>
												<RenameOutlineIcon />
											</IconButton>
										) : null} */}
									</ListItem>
								))}
							</List>
							<Button
								variant="outlined"
								startIcon={<AddCardIcon />}
								sx={{ my: 1 }}
							>
								Add Answer
							</Button>
						</Paper>
					</AccordionDetails>
				</Accordion>
			))}
			<Button
				onClick={handleAddQuestion}
				variant="contained"
				startIcon={<AddCardIcon />}
				sx={{ mt: 3 }}
			>
				Add Question
			</Button>
		</>
	)
}

export default QuestionsEdit
