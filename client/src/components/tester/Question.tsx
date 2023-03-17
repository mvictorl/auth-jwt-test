import { Button } from '@mui/material'
import { useState } from 'react'
import { Link as LinkRRD, useLocation } from 'react-router-dom'
import {
	selectCurrentExercises,
	selectCurrentUser,
	selectIsAuth,
	useAppSelector,
} from '../../store/hooks/stateHooks'

const Question = () => {
	const exercise = useAppSelector(selectCurrentExercises)
	const isAuth = useAppSelector(selectIsAuth)
	const currentUser = useAppSelector(selectCurrentUser)
	const { pathname } = useLocation()

	const [step, setStep] = useState<number>(0)

	const EditBtn = () => {
		return isAuth &&
			(currentUser.id === exercise?.userId ||
				currentUser.roles.includes('ADMIN')) ? (
			<Button variant="outlined" to={`${pathname}/edit`} component={LinkRRD}>
				Редактировать тест
			</Button>
		) : null
	}

	return (
		<>
			{step === 0 ? (
				<>
					<Button variant="outlined" onClick={() => setStep(1)} sx={{ mr: 5 }}>
						Начать тест
					</Button>
					<EditBtn />
				</>
			) : (
				<h1>{exercise.questions[step].text}</h1>
			)}
		</>
	)
}

export default Question
