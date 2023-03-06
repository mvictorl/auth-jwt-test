// import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Root from './components/Root'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import RestorePwd from './components/auth/RestorePwd'
import PasswordRestoreCode from './pages/PasswordRestoreCode'
import TesterPage from './pages/TesterPage'
import ExerciseList from './components/tester/ExerciseList'
import AddExercise from './components/tester/AddExercise'
import EditExercise from './components/tester/EditExercise'

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
				path: 'signup',
				element: <SignUp />,
			},
			{
				path: 'signin',
				element: <SignIn />,
			},
			{
				path: 'restore',
				element: <RestorePwd />,
			},
			{
				path: 'restored',
				element: <PasswordRestoreCode />,
			},
			{
				path: 'tester',
				element: <TesterPage />,
				children: [
					{
						path: 'exercises',
						children: [
							{
								index: true,
								element: <ExerciseList />,
							},
							{
								path: 'add',
								element: <AddExercise />,
							},
							{
								path: 'edit/:id',
								element: <EditExercise />,
							},
						],
					},
				],
			},
		],
	},
])
