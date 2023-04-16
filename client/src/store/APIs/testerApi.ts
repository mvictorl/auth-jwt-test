import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from '../../interfaces/IUser'
import { IAuthResponse } from '../../interfaces/IAuthResponse'
import { store } from '..'
import { logout } from '../thunks/auth-thunk'

export interface ITestLight {
	id?: string
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

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:5000/api/tester',
	credentials: 'include',
	prepareHeaders: headers => {
		headers.set(
			'authorization',
			`Bearer ${localStorage.getItem('bearer-token')}`
		)
		return headers
	},
})

const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions)
	if (result.error && result.error.status === 401) {
		// try to get a new token
		const refreshResult = await baseQuery('http://localhost:5000/api/auth/refresh', api, extraOptions)
		const data = refreshResult.data as IAuthResponse
		if (data) {
			// store the new token
			console.log('refreshResult.data:', data)

			if (data.hasOwnProperty('accessToken')) {
				localStorage.setItem('bearer-token', data.accessToken)
			}
			// retry the initial query below
			result = await baseQuery(args, api, extraOptions)
		} else {
			// store.dispatch(logout())
		}
	}
	return result
}

export const testerApi = createApi({
	reducerPath: 'tester',
	tagTypes: ['Tests'],
	baseQuery: baseQueryWithReauth,
	endpoints: builder => ({
		getAllTests: builder.query<ITestLight[], void>({
			query: () => 'exercises',
			providesTags: ['Tests'],
		}),

		getOneTest: builder.query<ITest, number>({
			query: testId => `exercises/${testId}`,
			providesTags: ['Tests'],
		}),

		addNewTest: builder.mutation<ITestLight, ITestLight>({
			query: newTest => ({
				url: 'exercises',
				method: 'POST',
				body: newTest,
			}),
			invalidatesTags: ['Tests'],
		}),
	}),


})

export const { useGetAllTestsQuery, useGetOneTestQuery, useAddNewTestMutation } = testerApi
