import { IAnswer } from './IAnswer'

export interface IQuestion {
	id: string
	text: string
	answers: IAnswer[]
}
