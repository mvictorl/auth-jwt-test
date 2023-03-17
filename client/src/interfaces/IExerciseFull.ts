import { IQuestionId } from './IQuestionId'

export interface IExerciseFull {
	id: string
	title: string
	description: string
	questions: IQuestionId[]
	isMultiple: boolean
	userId: string
}
