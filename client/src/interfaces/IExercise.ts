import { IQuestion } from './IQuestion'

export interface IExercise {
	id: string
	title: string
	description: string
	questions: IQuestion[]
	isMultiple: boolean
	userId: string
}
