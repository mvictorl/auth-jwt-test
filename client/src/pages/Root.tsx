import { Container, CssBaseline } from '@mui/material'
import { Outlet } from 'react-router-dom'
import MainMenu from '../components/MainMenu/MainMenu'

function Root() {
	return (
		<>
			<CssBaseline />
			<MainMenu />
			<Container maxWidth="xl" sx={{ pt: 3 }}>
				<Outlet />
			</Container>
		</>
	)
}

export default Root
