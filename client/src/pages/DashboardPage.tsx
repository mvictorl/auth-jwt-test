import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { selectAuthIsAuth, useAppSelector } from '../store/hooks'

function DashboardPage() {
	const isAuth = useAppSelector(selectAuthIsAuth)

	const { state, pathname } = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		if (!isAuth) {
			navigate(state?.from || '/', { replace: true })
		}
	}, [isAuth])

	return <h2>Dashboard Page</h2>
}

export default DashboardPage
