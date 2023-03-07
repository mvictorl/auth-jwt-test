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

const DeleteDialog = ({
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
				{"Use Google's location service?"}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Let Google help apps determine location. This means sending anonymous
					location data to Google, even when no apps are running.
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

export default DeleteDialog
