// import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Root from './pages/Root'
import HomePage from './pages/HomePage'
import ErrorPage from './pages/ErrorPage'
import SignUp from './components/Auth/SignUp'
import SignIn from './components/Auth/SignIn'

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
			// 		{
			// 			path: 'restore',
			// 			element: <RestorePwd />,
			// 		},
			// 		{
			// 			path: 'restored',
			// 			element: <PasswordRestoreCode />,
			// 		},
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

/*
/ - HomePage.tsx
/signin - SignIn.tsx
/signup - SignUp.tsx


*/
