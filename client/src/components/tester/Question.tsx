import { useSelector } from 'react-redux'
import { IRootState } from '../../store'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { IExerciseFull } from '../../interfaces/IExerciseFull'

const Question = () => {
	const exercise: IExerciseFull = useSelector(
		(state: IRootState) => state.exercise.currentExercise
	)

	const [step, setStep] = useState<number>(0)

	// useEffect(() => {
	// 	questionsCount = exercise.questions.length
	// }, [exercise])

	return (
		<>
			{step === 0 ? (
				<Button onClick={() => setStep(1)}>Начать тест</Button>
			) : (
				<h1>{exercise.questions[step].text}</h1>
			)}
		</>
	)
}

export default Question
