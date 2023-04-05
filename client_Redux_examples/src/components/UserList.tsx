import React from 'react'
import {
	useGetAllUsersQuery,
	useLazyGetOneUserQuery,
} from '../store/APIs/userApi'

const UserList = () => {
	const [selectValue, setSelectValue] = React.useState<number>(1)

	const {
		data: users,
		isLoading: allUserLoading,
		isError: allUsersError,
	} = useGetAllUsersQuery()

	const [
		trigger,
		{ data: user, isLoading: oneUserLoading, isError: oneUserError },
	] = useLazyGetOneUserQuery()

	const handleSelectValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		const v = parseInt(e.target.value)
		if (v > 0 && v < 12) {
			setSelectValue(v)
		}
	}

	const handleGetUser = () => {
		trigger(selectValue)
	}

	if (allUserLoading) return <h2>Loading...</h2>
	if (allUsersError) return <h2>Error occurs!</h2>
	return (
		<div style={{ textAlign: 'left' }}>
			<ol>
				{users?.map(user => (
					<li key={user.id}>{user.name}</li>
				))}
			</ol>

			<label htmlFor="userId">Input the user ID (1-10):</label>
			<br />
			<input
				type="number"
				id="userId"
				min="1"
				max="11"
				value={selectValue}
				onChange={e => handleSelectValue(e)}
				style={{ fontSize: '1.5rem', marginRight: '1rem' }}
			/>
			<button onClick={handleGetUser}>Get User with ID</button>
			{oneUserError ? (
				<p>Error ocurs!</p>
			) : oneUserLoading ? (
				<p>Loading...</p>
			) : user ? (
				<h4>{user.name}</h4>
			) : null}
		</div>
	)
}

export default UserList
