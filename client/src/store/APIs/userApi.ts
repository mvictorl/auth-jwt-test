import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IUser {
	id: number
	name: string
	username: string
	email: string
	address: {
		street: string
		suite: string
		city: string
		zipcode: string
		geo: {
			lat: string
			lng: string
		}
	}
	phone: string
	website: string
	company: {
		name: string
		catchPhrase: string
		bs: string
	}
}

export const userApi = createApi({
	reducerPath: 'users',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://jsonplaceholder.typicode.com/',
	}),
	endpoints: builder => ({
		getAllUsers: builder.query<IUser[], void>({
			query: () => `users`,
		}),

		getOneUser: builder.query<IUser, number>({
			// query: userId => {return userId ? `users/${userId}` : {} as IUser}
			query: userId => `users/${userId}`,
		}),
	}),
})

export const { useGetAllUsersQuery, useLazyGetOneUserQuery } = userApi
