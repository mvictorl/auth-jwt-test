import React from 'react'
import {
	selectAuthCurrentUser,
	selectAuthIsAuth,
	useAppDispatch,
	useAppSelector,
} from '../../store/hooks'
import { login, logout } from '../../store/thunks/auth-thunk'

const AuthTest = () => {
	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(selectAuthIsAuth)
	const currentUser = useAppSelector(selectAuthCurrentUser)

	const handleLogin = () => {
		dispatch(
			login({
				username: 'Victor',
				password: '123456',
				remember: true,
			})
		)
	}

	const handleLogout = () => {
		dispatch(logout())
	}

	return (
		<div>
			<button onClick={handleLogin}>User Login</button>
			{isAuth ? (
				<>
					<h3>
						Logged User:{' '}
						<span style={{ color: 'red' }}>
							{currentUser.username} ({currentUser.firstName}{' '}
							{currentUser.lastName})
						</span>
					</h3>
					<button onClick={handleLogout}>{currentUser.username} Logout</button>
				</>
			) : null}
		</div>
	)
}

export default AuthTest
