import { IUser } from './IUser'
import { IValidationErrorResponse } from './IValidationErrorResponse'

export interface IAuthResponse {
	accessToken: string
	user: IUser
	errors?: IValidationErrorResponse[]
}
