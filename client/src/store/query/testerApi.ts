import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IExercise } from '../../interfaces/IExercise'
import { IExerciseFull } from '../../interfaces/IExerciseFull'
import { IExerciseId } from '../../interfaces/IExerciseId'

export const testerApi = createApi({
	reducerPath: 'testerApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/tester/' }),
	tagTypes: ['Exercise'],
	endpoints: builder => ({
		getAllExercise: builder.query<IExerciseId[], void>({
			query: () => `exercises`,
			providesTags: ['Exercise'],
		}),
		getExerciseById: builder.query<IExerciseFull, string>({
			query: id => `exercises/${id}`,
			providesTags: ['Exercise'],
		}),
		addNewExercise: builder.mutation<IExerciseId, IExercise>({
			query: initialExercise => ({
				url: 'exercises',
				method: 'POST',
				body: initialExercise,
			}),
			invalidatesTags: ['Exercise'],
		}),
		changeExercise: builder.mutation<IExerciseId, IExerciseId>({
			query: newExercise => ({
				url: 'exercises',
				method: 'PATCH',
				body: newExercise,
			}),
			invalidatesTags: ['Exercise'],
		}),
		deleteExerciseByID: builder.mutation<IExerciseId, string>({
			query: id => ({
				url: `exercises/${id}`,
				method: 'DELETE',
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
} = testerApi
