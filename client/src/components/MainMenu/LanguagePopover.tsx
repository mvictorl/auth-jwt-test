import { useState } from 'react'
// @mui
import { alpha } from '@mui/material/styles'
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material'
import { useSelector } from 'react-redux'
import {
	SupportedLocales,
	selectLocale,
	setLocale,
} from '../../store/slices/local-slice'
import { useAppDispatch } from '../../store/hooks'

import i18n from '../../i18n'

// ----------------------------------------------------------------------

const LANGS = [
	{
		value: 'enUS' as SupportedLocales,
		label: 'English',
		icon: '/images/flags/gb.svg',
	},
	{
		value: 'ruRU' as SupportedLocales,
		label: 'Русский',
		icon: '/images/flags/ru.svg',
	},
]

// ----------------------------------------------------------------------

export default function LanguagePopover() {
	const locale = useSelector(selectLocale)
	const dispatch = useAppDispatch()

	const currLang = LANGS.find(l => l.value === locale) || LANGS[0]

	const [open, setOpen] = useState<HTMLElement | null>(null)

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		setOpen(event.currentTarget)
	}

	const handleChooseLang = (lang: SupportedLocales) => {
		setOpen(null)
		dispatch(setLocale(lang))
	}

	return (
		<div>
			<IconButton
				onClick={handleOpen}
				sx={{
					padding: 0,
					marginRight: { xs: 1, md: 2 },
					width: 44,
					height: 44,
					...(Boolean(open) && {
						bgcolor: theme =>
							alpha(
								theme.palette.secondary.dark,
								theme.palette.action.focusOpacity
							),
					}),
				}}
			>
				<img src={currLang.icon} alt={currLang.label} height={'50%'} />
			</IconButton>

			<Popover
				open={Boolean(open)}
				anchorEl={open}
				onClose={handleChooseLang}
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
					{LANGS.map(lang => (
						<MenuItem
							key={lang.value}
							selected={lang.value === currLang.value}
							onClick={() => handleChooseLang(lang.value)}
						>
							<Box
								component="img"
								alt={lang.label}
								src={lang.icon}
								sx={{ width: 28, mr: 2 }}
							/>

							{lang.label}
						</MenuItem>
					))}
				</Stack>
			</Popover>
		</div>
	)
}
