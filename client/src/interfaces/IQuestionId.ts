import { IAnswer } from './IAnswer'

export interface IQuestionId {
	id: string
	text: string
	answers?: IAnswer[]
}
