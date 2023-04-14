import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from '../../interfaces/IUser'

export interface ITestLight {
	id: string
	title: string
	description: string
	isMultiple: boolean
	userId: string
}

export interface ITest extends ITestLight {
	questions: Question[]
}

export interface Question {
	id: string
	exerciseId: string
	text: string
	answers: Answer[]
}

export interface Answer {
	id: string
	text: string
	isCorrect: boolean
}

export const testerApi = createApi({
	reducerPath: 'tester',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5000/api/tester',
	}),
	endpoints: builder => ({
		getAllTests: builder.query<ITestLight[], void>({
			query: () => 'exercises',
		}),

		getOneTest: builder.query<ITest, number>({
			query: testId => `exercises/${testId}`,
		}),
	}),
})

export const { useGetAllTestsQuery, useGetOneTestQuery } = testerApi
