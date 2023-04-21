import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import {
	Avatar,
	Box,
	Button,
	Container,
	Divider,
	IconButton,
	Link,
	List,
	ListItem,
	ListItemAvatar,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Stack,
	TablePagination,
} from '@mui/material'
import { SvgIconComponent } from '@mui/icons-material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import EditNoteIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTranslation } from 'react-i18next'
import { Link as LinkRRD, useNavigate } from 'react-router-dom'
import {
	ITestLight,
	useAddNewTestMutation,
	useGetAllTestsQuery,
} from '../../store/APIs/testerApi'
import AddTestDialog from './AddTestDialog'
import { selectAuthCurrentUser, useAppSelector } from '../../store/hooks'
import TestListContextMenu from './TestListContextMenu'

import ContextMenu, { componentItemType } from './ContextMenu'

function TestList() {
	const { data } = useGetAllTestsQuery()
	const currentUser = useAppSelector(selectAuthCurrentUser)
	const navigate = useNavigate()
	const { t } = useTranslation()

	const [tests, setTests] = useState<ITestLight[]>([])

	const [addNewTest, { isSuccess: isAddSuccess, isError: isAddError }] =
		useAddNewTestMutation()

	// --------- Pagination -------------------------------------------
	const [page, setPage] = useState<number>(0)
	const [rowsPerPage, setRowsPerPage] = useState<number>(5)
	const handleChangePage = (
		event: MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage)
	}
	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		setPage(0)
		setRowsPerPage(parseInt(event.target.value, 10))
	}
	useEffect(() => {
		if (data) setTests(data.slice(page * rowsPerPage, (page + 1) * rowsPerPage))
		else setTests([])
	}, [data, page, rowsPerPage])
	// ----------------------------------------------------------------

	// --------- Add Test Dialog --------------------------------------
	const [openAddDialog, setOpenAddDialog] = useState<boolean>(false)
	const [titleError, setTitleError] = useState<string>('')
	const handleOkDialog = (newTest: {
		title: string
		description: string
		isMultiple: boolean
	}) => {
		if (newTest.title) {
			setTitleError('')
			setOpenAddDialog(false)
			// addNewTest({ ...newTest, userId: currentUser.id })
			addNewTest({ ...newTest })
		} else {
			setTitleError('Input the title')
		}
	}
	const handleCancelDialog = () => {
		setTitleError('')
		setOpenAddDialog(false)
	}
	// ----------------------------------------------------------------

	const [contextMenuPos, setContextMenuPos] = useState<{
		mouseX: number
		mouseY: number
	} | null>(null)

	const [currentId, setCurrentId] = useState<string>('')

	const handleContextMenu = (event: MouseEvent, id: string) => {
		event.preventDefault()
		event.stopPropagation()
		setCurrentId(id)
		setContextMenuPos(
			contextMenuPos === null
				? {
						mouseX: event.clientX + 2,
						mouseY: event.clientY - 6,
				  }
				: null
		)
	}

	const handleCloseContextMenu = () => {
		setContextMenuPos(null)
		setCurrentId('')
	}

	// -------------------------------------------
	const contextMenuItems: componentItemType[] = [
		{
			Icon: <PlayCircleOutlineIcon />,
			name: t('run'),
			action: (id: string) => {
				console.log('ID Run:', id)
			},
		},
		{
			Icon: <EditNoteIcon />,
			name: t('edit'),
			action: (id: string) => {
				console.log('ID Edit:', id)
			},
			divider: true,
		},
		{
			Icon: <DeleteIcon />,
			name: t('delete'),
			action: (id: string) => {
				console.log('ID Delete:', id)
			},
		},
	]
	// -------------------------------------------

	return (
		<Container maxWidth="md">
			{currentUser &&
			['MANAGER', 'ADMIN'].some(role => currentUser.roles.includes(role)) ? (
				<>
					<AddTestDialog
						open={openAddDialog}
						onOkDialog={handleOkDialog}
						onCancelDialog={handleCancelDialog}
						titleError={titleError}
					/>
					<Stack direction="row" justifyContent="right">
						<Button
							variant="contained"
							startIcon={<LibraryAddIcon />}
							size="small"
							onClick={() => setOpenAddDialog(true)}
						>
							{t('add-new-test')}
						</Button>
					</Stack>
				</>
			) : null}
			<List>
				<Divider variant="inset" component="li" />
				{tests
					? tests.map(test => (
							<div key={test.id}>
								<Link to={`${test.id}`} underline="none" component={LinkRRD}>
									<ListItem
										onContextMenu={e => handleContextMenu(e, test.id)}
										secondaryAction={
											<IconButton
												onClick={e => handleContextMenu(e, test.id)}
												edge="end"
												aria-label="delete"
											>
												<MoreVertIcon />
											</IconButton>
										}
									>
										<ListItemAvatar>
											<Avatar>
												<LibraryAddCheckIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={test.title}
											secondary={
												test.isMultiple
													? 'Multiple-answer test'
													: 'Single-answer test'
											}
										/>
									</ListItem>
								</Link>
								<Divider variant="inset" component="li" />

								{/* <TestListContextMenu
									contextMenu={contextMenuPos}
									setContextMenu={setContextMenuPos}
									open={contextMenuPos !== null}
									id={currentId}
								/> */}
								<ContextMenu
									open={currentId !== ''}
									contextMenuPos={
										contextMenuPos ? contextMenuPos : { mouseX: 10, mouseY: 10 }
									}
									handleCloseContextMenu={handleCloseContextMenu}
									items={contextMenuItems}
								/>
							</div>
					  ))
					: null}
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={data ? data.length : 0}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</List>
		</Container>
	)
}

export default TestList
