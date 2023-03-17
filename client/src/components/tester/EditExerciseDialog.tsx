import { useEffect, useState } from 'react'
import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControlLabel,
	TextField,
} from '@mui/material'
import { IExerciseId } from '../../interfaces/IExerciseId'

type EditExerciseDialogProps = {
	open: boolean
	onOkDialog: (v: IExerciseId) => void
	onCancelDialog: () => void
	exercise: IExerciseId
}

const EditExerciseDialog = ({
	open,
	onOkDialog,
	onCancelDialog,
	exercise,
}: EditExerciseDialogProps) => {
	const [title, setTitle] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [isMultiple, setIsMultiple] = useState<boolean>(false)

	const handleOk = () => {
		onOkDialog({
			id: exercise.id,
			title,
			description,
			isMultiple,
			userId: exercise.userId,
		})
	}

	const handleCancel = () => {
		onCancelDialog()
	}

	useEffect(() => {
		setTitle(exercise.title)
		setDescription(exercise.description)
		setIsMultiple(exercise.isMultiple)
		return () => {
			setTitle('')
			setDescription('')
			setIsMultiple(false)
		}
	}, [])

	return (
		<Dialog
			open={open}
			onClose={handleCancel}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle
				id="alert-dialog-title"
				sx={{
					textAlign: 'center',
					color: 'white',
					backgroundColor: '#2196f3',
					mb: 2,
				}}
			>
				Редактирование описания теста
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					<TextField
						autoFocus
						id="new-title"
						type="text"
						value={title}
						onChange={e => setTitle(e.target.value)}
						label="Title"
						variant="outlined"
						margin="dense"
						fullWidth
					/>
					<TextField
						id="new-description"
						type="text"
						value={description}
						onChange={e => setDescription(e.target.value)}
						label="Description"
						variant="outlined"
						margin="dense"
						fullWidth
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={isMultiple}
								onChange={() => setIsMultiple(curr => !curr)}
								name="isMulti"
								color="primary"
							/>
						}
						label="Multi-answer"
					/>
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCancel}>Cancel</Button>
				<Button onClick={handleOk}>Ok</Button>
			</DialogActions>
		</Dialog>
	)
}

export default EditExerciseDialog
