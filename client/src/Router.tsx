// import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ErrorGetPasswordRestore from './components/Auth/ErrorGetPasswordRestore'
import RestorePassword from './components/Auth/RestorePassword'
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'
import SuccessGetPasswordRestore from './components/Auth/SuccessGetPasswordRestore'
import UseRestoreCode from './components/Auth/UseRestoreCode'
import AccountPage from './pages/AccountPage'
import DashboardPage from './pages/DashboardPage'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'
import PasswordRestorePage from './pages/PasswordRestorePage'
import ProfilePage from './pages/ProfilePage'
import Root from './pages/Root'
import TesterPage from './pages/TesterPage'
import TestList from './components/Tester/TestList'
import TestEdit from './components/Tester/TestEdit'
import TestCreate from './components/Tester/TestCreate'
import TestRun from './components/Tester/TestRun'
import TestDetails from './components/Tester/TestDetails'

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
				path: 'dashboard',
				element: <DashboardPage />,
			},
			{
				path: 'account',
				element: <AccountPage />,
			},
			{
				path: 'profile',
				element: <ProfilePage />,
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
				path: 'password_restore',
				element: <PasswordRestorePage />,
				children: [
					{
						path: '',
						element: <RestorePassword />,
					},
					{
						path: 'ok',
						element: <SuccessGetPasswordRestore />,
					},
					{
						path: 'error',
						element: <ErrorGetPasswordRestore />,
					},
					{
						path: 'change',
						element: <UseRestoreCode />,
					},
				],
			},
			{
				path: 'restore',
				element: <RestorePassword />,
			},
			{
				path: 'restored',
				element: <SuccessGetPasswordRestore />,
			},
			{
				path: 'tester',
				element: <TesterPage />,
				children: [
					{
						index: true,
						element: <TestList />,
					},
					{
						path: ':id',
						element: <TestDetails />,
					},
					{
						path: 'run/:id',
						element: <TestRun />,
					},
					{
						path: 'edit/:id',
						element: <TestEdit />,
					},
					{
						path: 'create',
						element: <TestCreate />,
					},
				],
			},
			// 		{
			// 			path: 'tester',
			// 			element: <TesterPage />,
			// 			children: [
			// 				{
			// 					path: 'exercises',
			// 					children: [
			// 						{
			// 							index: true,
			// 							element: <ExerciseList />,
			// 						},
			// 						// {
			// 						// 	path: 'add',
			// 						// 	element: <AddExercise />,
			// 						// },
			// 						// {
			// 						// 	path: 'edit/:id',
			// 						// 	element: <EditExercise />,
			// 						// },
			// 						{
			// 							path: ':id',
			// 							element: <Exercise />,
			// 							children: [
			// 								{
			// 									index: true,
			// 									element: <Question />,
			// 								},
			// 								{
			// 									path: 'edit',
			// 									element: <QuestionsEdit />,
			// 								},
			// 							],
			// 						},
			// 					],
			// 				},
			// 			],
			// 		},
		],
	},
])
