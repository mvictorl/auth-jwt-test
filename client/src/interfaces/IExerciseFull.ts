import { IQuestion } from './IQuestion'

export interface IExerciseFull {
	id: string
	title: string
	description: string
	questions: IQuestion[]
	isMultiple: boolean
	userId: string
}
