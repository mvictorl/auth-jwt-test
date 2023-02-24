import { useState } from 'react'
import { Link as LinkRRD, useLocation, useNavigate } from 'react-router-dom'
import {
	Avatar,
	Box,
	Divider,
	Tooltip,
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Typography,
} from '@mui/material'
import {
	Login as LogIn,
	Logout as LogOut,
	HowToReg as Activate,
	AccountBox,
	Settings,
} from '@mui/icons-material'
import { logout } from '../store/actions/authActions'
import { IUser } from '../interfaces/IUser'
import {
	selectCurrentUser,
	selectIsAuth,
	useAppDispatch,
	useAppSelector,
} from '../store/hooks/stateHooks'

const AppBarUser = () => {
	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(selectIsAuth)
	const currentUser = useAppSelector(selectCurrentUser)

	const location = useLocation()

	function stringToColor(string: string) {
		let hash = 0
		let i
		/* eslint-disable no-bitwise */
		for (i = 0; i < string.length; i += 1) {
			hash = string.charCodeAt(i) + ((hash << 5) - hash)
		}
		let color = '#'
		for (i = 0; i < 3; i += 1) {
			const value = (hash >> (i * 8)) & 0xff
			color += `00${value.toString(16)}`.slice(-2)
		}
		/* eslint-enable no-bitwise */
		return color
	}

	function stringAvatar(user: IUser) {
		let out = user.username[0]
		if (user.firstName) {
			out = user.firstName[0]
			if (user.lastName) {
				out += user.lastName[0]
			}
		}
		return {
			sx: { bgcolor: stringToColor(out) },
			children: out,
		}
	}

	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}

	const handleActivate = () => {
		setAnchorElUser(null)
		// dispatch()
	}

	const handleLogout = () => {
		setAnchorElUser(null)
		dispatch(logout())
	}

	// const out: React.ElementType = <></>

	const out = isAuth ? (
		<Box sx={{ flexGrow: 0 }}>
			<Tooltip title="Open settings">
				<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
					<Avatar {...stringAvatar(currentUser)} src="#" />
				</IconButton>
			</Tooltip>
			<Menu
				sx={{ mt: '45px' }}
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
				<MenuItem onClick={handleCloseUserMenu}>
					<ListItemIcon>
						<AccountBox />
					</ListItemIcon>
					<ListItemText>
						<Typography textAlign="left">Profile</Typography>
					</ListItemText>
				</MenuItem>
				<MenuItem onClick={handleCloseUserMenu}>
					<ListItemIcon>
						<Settings />
					</ListItemIcon>
					<ListItemText>
						<Typography textAlign="left">Account</Typography>
					</ListItemText>
				</MenuItem>

				{currentUser.isActivated ? null : (
					<MenuItem onClick={handleActivate}>
						<ListItemIcon>
							<Activate />
						</ListItemIcon>
						<ListItemText>
							<Typography textAlign="left">Activate</Typography>
						</ListItemText>
					</MenuItem>
				)}

				<Divider />

				<MenuItem onClick={handleLogout}>
					<ListItemIcon>
						<LogOut />
					</ListItemIcon>
					<ListItemText>
						<Typography textAlign="left">Logout</Typography>
					</ListItemText>
				</MenuItem>
			</Menu>
		</Box>
	) : (
		<Box sx={{ flexGrow: 0 }}>
			<Tooltip title="Login">
				<IconButton
					sx={{ p: 0 }}
					to="/signin"
					state={{ from: location.pathname }}
					component={LinkRRD}
				>
					<LogIn
						sx={{
							fontWeight: 700,
							textDecoration: 'none',
							color: 'white',
						}}
					/>
				</IconButton>
			</Tooltip>
		</Box>
	)

	return out
}

export default AppBarUser
