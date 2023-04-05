import React from 'react'
import { Box, Link, Stack, Typography } from '@mui/material'

function Logo() {
	return (
		<Stack
			href="/"
			component={Link}
			direction="row"
			alignItems="center"
			sx={{ margin: { xs: 'auto', md: 0 } }}
		>
			<Box
				component="img"
				src="images/Gazprom_White.ico"
				sx={{ height: 48, mr: 2 }}
			/>

			<Stack alignItems="center">
				<Typography
					variant="body1"
					fontSize={14}
					noWrap
					sx={{
						display: { xs: 'none', md: 'flex' },
						fontWeight: 700,
						letterSpacing: '.2rem',
						color: 'white',
						textDecoration: 'none',
					}}
				>
					Газпром
				</Typography>
				<Typography
					variant="body2"
					fontSize={12}
					noWrap
					sx={{
						display: { xs: 'none', md: 'flex' },
						fontWeight: 700,
						color: 'white',
						textDecoration: 'none',
					}}
				>
					трансгаз
				</Typography>
				<Typography
					variant="subtitle1"
					fontSize={13}
					noWrap
					sx={{
						display: { xs: 'none', md: 'flex' },
						fontWeight: 700,
						color: 'white',
						textDecoration: 'none',
					}}
				>
					Беларусь
				</Typography>
			</Stack>
		</Stack>
	)
}

export default Logo
