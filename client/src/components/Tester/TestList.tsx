import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
	Avatar,
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
	TablePagination,
} from '@mui/material'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import EditNoteIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { Link as LinkRRD, useNavigate } from 'react-router-dom'
import { ITestLight, useGetAllTestsQuery } from '../../store/APIs/testerApi'

function TestList() {
	const { data } = useGetAllTestsQuery()
	const navigate = useNavigate()

	const [tests, setTests] = useState<ITestLight[]>([])
	const [page, setPage] = useState<number>(0)
	const [rowsPerPage, setRowsPerPage] = useState<number>(2)
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
		setTests(
			data ? data.slice(page * rowsPerPage, (page + 1) * rowsPerPage) : []
		)
		console.table(data)
	}, [data, page, rowsPerPage])

	const [contextMenu, setContextMenu] = React.useState<{
		mouseX: number
		mouseY: number
	} | null>(null)

	const handleContextMenu = (event: MouseEvent) => {
		event.preventDefault()
		event.stopPropagation()
		setContextMenu(
			contextMenu === null
				? {
						mouseX: event.clientX + 2,
						mouseY: event.clientY - 6,
				  }
				: null
		)
	}

	const handleClose = () => {
		setContextMenu(null)
	}

	const handleEdit = (event: React.MouseEvent, id: string) => {
		event.preventDefault()
		event.stopPropagation()
		setContextMenu(null)
		navigate(`edit/${id}`)
	}

	type labelDisplayedRowsType = { from: number; to: number; count: number }
	const labelDisplayedRows = ({ from, to, count }: labelDisplayedRowsType) => {
		return `${from}–${to} / ${count !== -1 ? count : `more than ${to}`}`
	}

	return (
		<>
			<h4>Test List Component</h4>

			<Container maxWidth="md">
				<List>
					{tests
						? tests.map(test => (
								<div key={test.id}>
									<Link to={`${test.id}`} underline="none" component={LinkRRD}>
										<ListItem
											onContextMenu={handleContextMenu}
											secondaryAction={
												<IconButton
													onClick={handleContextMenu}
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
												secondary="Secondary text"
											/>
										</ListItem>
									</Link>
									<Divider variant="inset" component="li" />

									<Menu
										open={contextMenu !== null}
										onClose={handleClose}
										anchorReference="anchorPosition"
										anchorPosition={
											contextMenu !== null
												? { top: contextMenu.mouseY, left: contextMenu.mouseX }
												: undefined
										}
									>
										<MenuItem onClick={handleClose} sx={{ fontWeight: 'bold' }}>
											<ListItemIcon>
												<PlayCircleOutlineIcon fontSize="small" />
											</ListItemIcon>
											<ListItemText>
												<b>Run</b>
											</ListItemText>
										</MenuItem>
										<MenuItem onClick={e => handleEdit(e, test.id)}>
											<ListItemIcon>
												<EditNoteIcon fontSize="small" />
											</ListItemIcon>
											<ListItemText>Edit</ListItemText>
										</MenuItem>
										<Divider />
										<MenuItem onClick={handleClose}>
											<ListItemIcon>
												<DeleteIcon fontSize="small" />
											</ListItemIcon>
											<ListItemText>Delete</ListItemText>
										</MenuItem>
									</Menu>
								</div>
						  ))
						: null}
					<TablePagination
						rowsPerPageOptions={[2, 5, 10, 25]}
						component="div"
						count={data ? data.length : 0}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
						// labelRowsPerPage="Rows/page:"
						// labelDisplayedRows={labelDisplayedRows}
					/>
				</List>
			</Container>
		</>
	)
}

export default TestList
