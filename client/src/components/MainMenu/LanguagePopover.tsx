import { useState } from 'react'
// @mui
import { alpha } from '@mui/material/styles'
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectLocale } from '../../store/slices/local-slice'

// ----------------------------------------------------------------------

const LANGS = [
	{
		value: 'enUS',
		label: 'English',
		icon: 'images/flags/gb.svg',
	},
	{
		value: 'ruRU',
		label: 'Русский',
		icon: 'images/flags/ru.svg',
	},
]

// ----------------------------------------------------------------------

export default function LanguagePopover() {
	const locale = useSelector(selectLocale)
	const currLang = LANGS.find(l => l.value === locale) || LANGS[0]

	const [open, setOpen] = useState(null)

	const handleOpen = (event: any) => {
		setOpen(event.currentTarget)
	}

	const handleClose = () => {
		setOpen(null)
	}

	return (
		<div>
			<IconButton
				onClick={handleOpen}
				sx={{
					textAlign: 'center',
					padding: 0,
					width: 44,
					height: 44,
					// ...(open && {
					// 	bgcolor: theme =>
					// 		alpha(
					// 			theme.palette.primary.main,
					// 			theme.palette.action.focusOpacity
					// 		),
					// }),
				}}
			>
				<img src={currLang.icon} alt={currLang.label} height={'50%'} />
			</IconButton>

			<Popover
				open={Boolean(open)}
				anchorEl={open}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				PaperProps={{
					sx: {
						p: 1,
						mt: 1.5,
						ml: 0.75,
						width: 180,
						'& .MuiMenuItem-root': {
							px: 1,
							typography: 'body2',
							borderRadius: 0.75,
						},
					},
				}}
			>
				<Stack spacing={0.75}>
					{LANGS.map(option => (
						<MenuItem
							key={option.value}
							selected={option.value === LANGS[0].value}
							onClick={() => handleClose()}
						>
							<Box
								component="img"
								alt={option.label}
								src={option.icon}
								sx={{ width: 28, mr: 2 }}
							/>

							{option.label}
						</MenuItem>
					))}
				</Stack>
			</Popover>
		</div>
	)
}
