import { useState } from 'react'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material'

type DeleteDialogProps = {
	open: boolean
	onOkDialog: () => void
	onCloseDialog: () => void
}

const DeleteExerciseDialog = ({
	open,
	onOkDialog,
	onCloseDialog,
}: DeleteDialogProps) => {
	// const [open, setOpen] = useState(false)

	const handleOk = () => {
		onOkDialog()
	}

	const handleCancel = () => {
		onCloseDialog()
	}

	return (
		<Dialog
			open={open}
			onClose={handleCancel}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				Подтверждение удаления теста
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Вы подтвержаете удаление теста?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCancel} autoFocus>
					Cancel
				</Button>
				<Button onClick={handleOk}>Ok</Button>
			</DialogActions>
		</Dialog>
	)
}

export default DeleteExerciseDialog
