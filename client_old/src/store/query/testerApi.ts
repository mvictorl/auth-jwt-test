import store from '../../store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IExercise } from '../../interfaces/IExercise'
import { IExerciseFull } from '../../interfaces/IExerciseFull'
import { IExerciseId } from '../../interfaces/IExerciseId'
import { IQuestion } from '../../interfaces/IQuestion'
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { IAuthResponse } from '../../interfaces/IAuthResponse'
import { logout } from '../actions/authActions'

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:5000/api/',
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
		const refreshResult = await baseQuery('auth/refresh', api, extraOptions)
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
			store.dispatch(logout())
		}
	}
	return result
}

export const testerApi = createApi({
	reducerPath: 'testerApi',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['Exercise'],
	endpoints: builder => ({
		getAllExercise: builder.query<IExerciseId[], void>({
			query: () => `tester/exercises`,
			// Sort by title
			transformResponse: (data: IExerciseId[]) =>
				data.sort((a, b) => {
					const fa = a.title.toLowerCase()
					const fb = b.title.toLowerCase()

					if (fa < fb) return -1
					if (fa > fb) return 1
					return 0
				}),
			providesTags: ['Exercise'],
		}),

		getExerciseById: builder.query<IExerciseFull, string>({
			query: id => `tester/exercises/${id}`,
			providesTags: ['Exercise'],
		}),

		addNewExercise: builder.mutation<IExerciseId, IExercise>({
			query: initialExercise => ({
				url: 'tester/exercises',
				method: 'POST',
				body: initialExercise,
			}),
			invalidatesTags: ['Exercise'],
		}),

		changeExercise: builder.mutation<IExerciseId, IExerciseId>({
			query: newExercise => ({
				url: `tester/exercises/${newExercise.id}`,
				method: 'PATCH',
				body: newExercise,
			}),
			invalidatesTags: ['Exercise'],
		}),

		deleteExerciseByID: builder.mutation<IExerciseId, string>({
			query: id => ({
				url: `tester/exercises/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Exercise'],
		}),

		addQuestionToExercise: builder.mutation<
			IExerciseId,
			{ id: string; newQuestion: IQuestion }
		>({
			query: ({ id, newQuestion }) => ({
				url: `tester/exercises/${id}/questions`,
				method: 'POST',
				body: newQuestion,
			}),
			invalidatesTags: ['Exercise'],
		}),
	}),
})

export const {
	useGetAllExerciseQuery,
	useGetExerciseByIdQuery,
	useAddNewExerciseMutation,
	useChangeExerciseMutation,
	useDeleteExerciseByIDMutation,
	useAddQuestionToExerciseMutation,
} = testerApi
