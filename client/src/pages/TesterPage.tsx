import { useState } from 'react'
import {
	Container,
	Typography,
	Button,
	CssBaseline,
	Backdrop,
	CircularProgress,
} from '@mui/material'
import { Link as LinkRRD, Outlet, useLocation } from 'react-router-dom'
import EditExerciseDialog from '../components/tester/EditExerciseDialog'

const TesterPage = () => {
	const { pathname } = useLocation()

	// Test Dialog Open - BEGIN
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

	const handleDialogReturnOk = (newText: string) => {
		console.log('Dialog returned OK', newText)
		setIsDialogOpen(false)
	}
	const handleDialogReturnCancel = () => {
		console.log('Dialog returned CANCEL')
		setIsDialogOpen(false)
	}
	// Test Dialog Open - END

	return (
		<Container>
			<CssBaseline />
			<Backdrop
				sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
				open={false}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Typography component="h1" variant="h4" align="center" marginBottom={5}>
				Tester Page
			</Typography>

			<Button onClick={() => setIsDialogOpen(true)} variant="outlined">
				Test Dialog Open
			</Button>
			{/* <EditExerciseDialog
				open={isDialogOpen}
				onOkDialog={handleDialogReturnOk}
				onCancelDialog={handleDialogReturnCancel}
				title="Редактирование текста вопроса"
				initText="Question..."
			/> */}

			<Outlet />
		</Container>
	)
}

export default TesterPage
