import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { AuthService } from '../../store/services/auth-service'
import { useTranslation } from 'react-i18next'

const theme = createTheme()

function RestorePassword() {
	const { t } = useTranslation()
	const navigate = useNavigate()

	const goBack = (e: any) => {
		e.preventDefault()
		navigate(-1)
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)

		AuthService.askRestore(
			data.get('email')!.toString(),
			data.get('password')!.toString(),
			data.get('passwordConfirm')!.toString()
		).then(
			() => {
				navigate('/password_restore/ok', {
					replace: true,
					state: { from: 'password_restore' },
				})
			},
			() => {
				navigate('/password_restore/error', {
					replace: true,
					state: { from: 'password_restore' },
				})
			}
		)
	}

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						{t('restore-pass')}
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label={t('email')}
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label={t('password')}
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="passwordConfirm"
							label={t('confirm-pass')}
							type="password"
							id="passwordConfirm"
							autoComplete="new-password"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							{t('send')}
						</Button>
						<Grid container>
							<Grid item xs>
								<Link onClick={goBack} variant="body2" component="button">
									{t('back')}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	)
}

export default RestorePassword
