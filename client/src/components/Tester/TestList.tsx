import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react"
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
} from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck"
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline"
import LibraryAddIcon from "@mui/icons-material/LibraryAdd"
import EditNoteIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { useTranslation } from "react-i18next"
import { Link as LinkRRD, useNavigate } from "react-router-dom"
import {
  ITestLight,
  useAddNewTestMutation,
  useGetAllTestsQuery,
} from "../../store/APIs/testerApi"
import AddTestDialog from "./AddTestDialog"
import { selectAuthCurrentUser, useAppSelector } from "../../store/hooks"

function TestList() {
  const { data } = useGetAllTestsQuery()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [tests, setTests] = useState<ITestLight[]>([])

  const currentUser = useAppSelector(selectAuthCurrentUser)
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
  const handleOkDialog = (newTest: {
    title: string
    description: string
    isMultiple: boolean
  }) => {
    setOpenAddDialog(false)
    addNewTest({ ...newTest, userId: currentUser.id })
  }
  const handleCancelDialog = () => {
    setOpenAddDialog(false)
  }
  // ----------------------------------------------------------------

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

  const handleEdit = (event: React.MouseEvent, id: string | undefined) => {
    event.preventDefault()
    event.stopPropagation()
    setContextMenu(null)
    navigate(id ? `edit/${id}` : "/")
  }

  type labelDisplayedRowsType = { from: number; to: number; count: number }
  const labelDisplayedRows = ({ from, to, count }: labelDisplayedRowsType) => {
    return `${from}–${to} / ${count !== -1 ? count : `more than ${to}`}`
  }

  return (
    <>
      <AddTestDialog
        open={openAddDialog}
        onOkDialog={handleOkDialog}
        onCancelDialog={handleCancelDialog}
      />
      <Container maxWidth="md">
        <Stack direction="row" justifyContent="right">
          <Button
            variant="contained"
            startIcon={<LibraryAddIcon />}
            size="small"
            onClick={() => setOpenAddDialog(true)}
          >
            {t("Add new test")}
          </Button>
        </Stack>
        <List>
          {tests
            ? tests.map((test) => (
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
                        secondary={
                          test.isMultiple
                            ? "Multiple-answer test"
                            : "Single-answer test"
                        }
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
                    <MenuItem onClick={handleClose} sx={{ fontWeight: "bold" }}>
                      <ListItemIcon>
                        <PlayCircleOutlineIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>
                        <b>Run</b>
                      </ListItemText>
                    </MenuItem>
                    <MenuItem onClick={(e) => handleEdit(e, test.id)}>
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
            rowsPerPageOptions={[5, 10, 25]}
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
