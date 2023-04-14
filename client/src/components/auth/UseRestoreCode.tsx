import { useEffect, useState } from 'react'
import { Link as LinkRRD, useLocation, useNavigate } from 'react-router-dom'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges'
import LoadingButton from '@mui/lab/LoadingButton'
import {
	Avatar,
	Box,
	Container,
	Grid,
	IconButton,
	InputAdornment,
	Link,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo'
import {
	selectAuthErrors,
	selectAuthLoading,
	selectAuthSuccess,
	useAppDispatch,
	useAppSelector,
} from '../../store/hooks'
import { IValidationErrorResponse } from '../../interfaces/IValidationErrorResponse'
import { clearError, clearSuccess } from '../../store/slices/auth-slice'
import { restore } from '../../store/thunks/auth-thunk'
import { useSnackbar } from 'notistack'

const UseRestoreCode = () => {
	const { state, pathname } = useLocation()
	const navigate = useNavigate()

	const { enqueueSnackbar, closeSnackbar } = useSnackbar()

	const dispatch = useAppDispatch()
	const isLoading = useAppSelector(selectAuthLoading)
	const errors = useAppSelector(selectAuthErrors)
	const success = useAppSelector(selectAuthSuccess)

	const [code, setCode] = useState<string>('')
	const [codeError, setCodeError] = useState<string>(' ')

	useEffect(() => {
		if (errors.length > 0) {
			errors.forEach((e: IValidationErrorResponse) => {
				if (e.param === 'code') {
					setCodeError(e.msg)
					setCode(e.value)
					enqueueSnackbar(
						'An error occurred generating the password recovery code',
						{ variant: 'error' }
					)
				}
			})
			dispatch(clearError())
		}
	}, [errors])

	const onPaste = async () => {
		if (navigator.clipboard) {
			const checkUUID =
				/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
			const clipCode = await navigator.clipboard.readText()
			if (checkUUID.test(clipCode)) {
				console.log('Clipboard text:', clipCode)
				setCode(clipCode)
			}
		}
	}

	const onSubmit = () => {
		dispatch(restore({ code })).then(() => {
			enqueueSnackbar('Successfully password change', {
				variant: 'success',
			})
		})
		navigate('/signin', { replace: true })
	}

	return (
		<Container maxWidth="xs" sx={{ mt: 5 }}>
			<Stack>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<Avatar variant="rounded" sx={{ m: 1, bgcolor: 'success.main' }}>
						<PublishedWithChangesIcon fontSize="large" />
					</Avatar>
					<Typography
						sx={{
							typography: { xs: 'h5', md: 'h4' },
							my: 2,
							textAlign: 'center',
						}}
					>
						Password Restore Code <br />
						successfully generated
					</Typography>
				</Box>

				<TextField
					required
					autoComplete="off"
					value={code}
					onChange={e => setCode(e.currentTarget.value)}
					name="code"
					label="Change password code"
					fullWidth
					margin="dense"
					error={codeError !== ' '}
					helperText={codeError || ' '}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={onPaste} edge="end">
									<ContentPasteGoIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</Stack>

			<LoadingButton
				onClick={onSubmit}
				fullWidth
				size="large"
				variant="contained"
				loading={isLoading}
			>
				Change
			</LoadingButton>

			<Grid container sx={{ mt: 2 }}>
				<Grid item xs>
					<Link
						to="/"
						component={LinkRRD}
						variant="subtitle2"
						sx={{
							display: 'block',
							textAlign: 'right',
							textDecoration: 'none',
						}}
					>
						Go to Home
					</Link>
				</Grid>
			</Grid>
		</Container>
	)
}

export default UseRestoreCode
