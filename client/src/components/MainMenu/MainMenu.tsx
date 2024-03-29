import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { MouseEvent, useState } from 'react'
import { Link as LinkRRD } from 'react-router-dom'
import LanguagePopover from './LanguagePopover'
import Logo from './Logo'
import UserComponent from './UserComponent'

import { useTranslation } from 'react-i18next'

const pages = ['Products', 'Pricing', 'Blog']

function MainMenu() {
	const { t, i18n } = useTranslation()

	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

	const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
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
						<Logo />
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
							<MenuItem onClick={handleCloseNavMenu} component={LinkRRD} to="/">
								<Typography textAlign="center">{t('home')}</Typography>
							</MenuItem>
							<MenuItem
								onClick={handleCloseNavMenu}
								component={LinkRRD}
								to="/tester"
							>
								<Typography textAlign="center">{t('tester')}</Typography>
							</MenuItem>
							{/* <MenuItem
								onClick={handleCloseNavMenu}
								component={LinkRRD}
								to="/signin"
							>
								<Typography textAlign="center">SignIn</Typography>
							</MenuItem>
							{pages.map(page => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Typography textAlign="center">{page}</Typography>
								</MenuItem>
							))} */}
						</Menu>
					</Box>

					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						<Logo />
						<Stack direction="row" marginLeft={3}>
							<Button
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: 'white', display: 'block' }}
								component={LinkRRD}
								to="/"
							>
								{t('home')}
							</Button>
							<Button
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: 'white', display: 'block' }}
								component={LinkRRD}
								to="/tester"
							>
								{t('tester')}
							</Button>
							{/* <Button
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: 'white', display: 'block' }}
								component={LinkRRD}
								to="/signin"
							>
								SignIn
							</Button> */}

							{/* {pages.map(page => (
								<Button
									key={page}
									onClick={handleCloseNavMenu}
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									{page}
								</Button>
							))} */}
						</Stack>
					</Box>
					<LanguagePopover />
					<UserComponent />
				</Toolbar>
			</Container>
		</AppBar>
	)
}
export default MainMenu
