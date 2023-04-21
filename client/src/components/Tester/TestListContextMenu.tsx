import React, { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
// @mui
import {
	Divider,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
} from '@mui/material'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import EditNoteIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTranslation } from 'react-i18next'

type TestListContextMenuProps = {
	contextMenu: {
		mouseX: number
		mouseY: number
	} | null
	setContextMenu: Function
	open: boolean
	id: string
}

const TestListContextMenu = ({
	contextMenu,
	setContextMenu,
	id,
	open,
}: TestListContextMenuProps) => {
	const { t } = useTranslation()
	const navigate = useNavigate()

	const handleClose = () => {
		setContextMenu(null)
	}

	const handleEdit = (event: MouseEvent) => {
		event.preventDefault()
		event.stopPropagation()
		setContextMenu(null)
		// navigate(id ? `edit/${id}` : '/')
		console.log('Context-ID:', id)
	}

	return (
		<Menu
			open={open}
			onClose={handleClose}
			anchorReference="anchorPosition"
			anchorPosition={
				open && contextMenu
					? { top: contextMenu.mouseY, left: contextMenu.mouseX }
					: undefined
			}
		>
			<MenuItem onClick={handleClose} sx={{ fontWeight: 'bold' }}>
				<ListItemIcon>
					<PlayCircleOutlineIcon fontSize="small" />
				</ListItemIcon>
				<ListItemText>
					<b>{t('run')}</b>
				</ListItemText>
			</MenuItem>
			<MenuItem onClick={handleEdit}>
				<ListItemIcon>
					<EditNoteIcon fontSize="small" />
				</ListItemIcon>
				<ListItemText>{t('edit')}</ListItemText>
			</MenuItem>
			<Divider />
			<MenuItem onClick={handleClose}>
				<ListItemIcon>
					<DeleteIcon fontSize="small" />
				</ListItemIcon>
				<ListItemText>{t('delete')}</ListItemText>
			</MenuItem>
		</Menu>
	)
}

export default TestListContextMenu
