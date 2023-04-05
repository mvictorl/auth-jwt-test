import { IAnswer } from './IAnswer'

export interface IQuestion {
	text: string
	answers?: IAnswer[]
}
