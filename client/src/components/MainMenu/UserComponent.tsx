import React, { MouseEvent, useState } from 'react'
import { Link as LinkRRD } from 'react-router-dom'
// @mui
import {
	Avatar,
	Box,
	Divider,
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Paper,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import DashboardIcon from '@mui/icons-material/Dashboard'
// Store
import {
	selectAuthCurrentUser,
	selectAuthIsAuth,
	useAppDispatch,
	useAppSelector,
} from '../../store/hooks'
import { logout } from '../../store/thunks/auth-thunk'

function UserComponent() {
	const isAuth = useAppSelector(selectAuthIsAuth)
	const loggedUser = useAppSelector(selectAuthCurrentUser)
	const dispatch = useAppDispatch()

	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

	const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}

	const handleLogout = () => {
		dispatch(logout())
		setAnchorElUser(null)
	}

	if (isAuth) {
		return (
			<Box sx={{ flexGrow: 0 }}>
				<Tooltip title="Open settings">
					<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
						<Avatar alt="Remy Sharp" src="/images/avatar/2.jpg" />
					</IconButton>
				</Tooltip>
				<Menu
					sx={{ mt: '40px' }}
					id="menu-appbar"
					anchorEl={anchorElUser}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					open={Boolean(anchorElUser)}
					onClose={handleCloseUserMenu}
				>
					<Stack direction="row" margin={1.5} alignItems="flex-end">
						<PersonOutlinedIcon />
						<Typography
							variant="subtitle2"
							flexGrow={1}
							textAlign="right"
							sx={{ fontStyle: 'italic' }}
						>
							{loggedUser.firstName} {loggedUser.lastName}
						</Typography>
					</Stack>
					<Divider />
					<MenuItem
						onClick={handleCloseUserMenu}
						to="/dashboard"
						component={LinkRRD}
					>
						<ListItemIcon>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText>Dashboard</ListItemText>
					</MenuItem>
					<MenuItem
						onClick={handleCloseUserMenu}
						to="/account"
						component={LinkRRD}
					>
						<ListItemIcon>
							<AssignmentIndIcon />
						</ListItemIcon>
						<ListItemText>Account</ListItemText>
					</MenuItem>
					<MenuItem
						onClick={handleCloseUserMenu}
						to="/profile"
						component={LinkRRD}
					>
						<ListItemIcon>
							<ManageAccountsIcon />
						</ListItemIcon>
						<ListItemText>Profile</ListItemText>
					</MenuItem>
					<Divider variant="middle" />
					<MenuItem onClick={handleLogout}>
						<ListItemIcon>
							<LogoutIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText>Logout</ListItemText>
					</MenuItem>
				</Menu>
			</Box>
		)
	} else {
		return (
			<Box sx={{ flexGrow: 0 }}>
				<Tooltip title="SignIn">
					<IconButton sx={{ p: 0 }} to="/signin" component={LinkRRD}>
						<Avatar>
							<LoginIcon />
						</Avatar>
					</IconButton>
				</Tooltip>
			</Box>
		)
	}
}

export default UserComponent
