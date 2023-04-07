import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { selectAuthIsAuth, useAppSelector } from '../store/hooks'

function AccountPage() {
	const isAuth = useAppSelector(selectAuthIsAuth)

	const { state, pathname } = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		if (!isAuth) {
			navigate(state?.from || '/', { replace: true })
		}
	}, [isAuth])

	return <h2>Account Page</h2>
}

export default AccountPage
