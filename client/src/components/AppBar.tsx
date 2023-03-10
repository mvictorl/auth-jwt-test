import { useState } from 'react'
import { Link as LinkRRD, NavLink } from 'react-router-dom'
import { AppBar as AppBarMUI } from '@mui/material'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import AppBarUser from './AppBarUser'

const pages = ['Products', 'SignUp', 'SignIn']

function AppBar() {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget)
	}

	const handleCloseNavMenu = (): void => {
		setAnchorElNav(null)
	}

	return (
		<AppBarMUI position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						LOGO
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							<MenuItem onClick={handleCloseNavMenu}>
								<Typography textAlign="center">products</Typography>
							</MenuItem>
							<MenuItem onClick={handleCloseNavMenu}>
								<Typography
									to="/signup"
									component={NavLink}
									textAlign="center"
									sx={{
										textAlign: 'center',
										textDecoration: 'none',
										color: 'inherit',
									}}
								>
									signup
								</Typography>
							</MenuItem>
							<MenuItem onClick={handleCloseNavMenu}>
								<Typography
									to="/signin"
									component={NavLink}
									textAlign="center"
									sx={{
										textAlign: 'center',
										textDecoration: 'none',
										color: 'inherit',
									}}
								>
									signin
								</Typography>
							</MenuItem>
							<MenuItem onClick={handleCloseNavMenu}>
								<Typography
									to="/tester"
									component={NavLink}
									textAlign="center"
									sx={{
										textAlign: 'center',
										textDecoration: 'none',
										color: 'inherit',
									}}
								>
									tester
								</Typography>
							</MenuItem>
						</Menu>
					</Box>
					<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						LOGO
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						<Button
							to="#"
							component={NavLink}
							onClick={handleCloseNavMenu}
							sx={{ my: 2, color: 'white', display: 'block' }}
						>
							products
						</Button>
						<Button
							to="/signup"
							component={NavLink}
							onClick={handleCloseNavMenu}
							sx={{ my: 2, color: 'white', display: 'block' }}
						>
							signup
						</Button>
						<Button
							to="/signin"
							component={NavLink}
							onClick={handleCloseNavMenu}
							sx={{ my: 2, color: 'white', display: 'block' }}
						>
							signin
						</Button>
						<Button
							to="/tester/exercises"
							component={NavLink}
							onClick={handleCloseNavMenu}
							sx={{ my: 2, color: 'white', display: 'block' }}
						>
							tester
						</Button>
					</Box>

					<AppBarUser />
				</Toolbar>
			</Container>
		</AppBarMUI>
	)
}
export default AppBar
