// import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Root from './components/Root'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import RestorePwd from './components/auth/RestorePwd'

export const Router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: '/signup',
				element: <SignUp />,
			},
			{
				path: '/signin',
				element: <SignIn />,
			},
			{
				path: '/restore',
				element: <RestorePwd />,
			},
		],
	},
])
