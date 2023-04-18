import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type AddTestDialogProps = {
	open: boolean
	onOkDialog: (e: {
		title: string
		description: string
		isMultiple: boolean
	}) => void
	onCancelDialog: () => void
}

const AddTestDialog = ({
	open,
	onOkDialog,
	onCancelDialog,
}: AddTestDialogProps) => {
	const { t } = useTranslation()
	const [title, setTitle] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [isMultiple, setIsMultiple] = useState<boolean>(false)

	const handleCreateOk = () => {
		onOkDialog({
			title,
			description,
			isMultiple,
		})
	}

	const handleCancel = () => {
		onCancelDialog()
	}

	useEffect(() => {
		return () => {
			setTitle('')
			setDescription('')
			setIsMultiple(false)
		}
	}, [open])

	return (
		<Dialog
			open={open}
			onClose={handleCancel}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			PaperProps={{ style: { borderRadius: 10 } }}
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
				{t('Add new test')}
			</DialogTitle>
			<DialogContent>
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
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCancel}>Cancel</Button>
				<Button type="submit" onClick={handleCreateOk}>
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default AddTestDialog
