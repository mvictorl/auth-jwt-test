import { useEffect } from 'react'
import { Box, CssBaseline, Divider, Grid, Typography } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { Outlet, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks/stateHooks'
import { useGetExerciseByIdQuery } from '../../store/query/testerApi'
import { setCurrentExercise } from '../../store/slices/exerciseSlice'

const theme = createTheme()

function Exercise() {
	const params = useParams()
	const id = params.id ? params.id : ''

	const dispatch = useAppDispatch()

	const { data, isLoading, isSuccess, isError } = useGetExerciseByIdQuery(id)

	useEffect(() => {
		dispatch(setCurrentExercise(data))
	}, [data])

	return (
		<Grid container maxWidth="xs">
			<CssBaseline />
			<Grid item xs={12}>
				<Box
					sx={{
						marginTop: 4,
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Typography component="h1" variant="h5">
						{data?.title ? data.title : 'No exercise'}
					</Typography>
					<Divider sx={{ marginBottom: 5 }} />
				</Box>
			</Grid>
			<Grid item xs={12}>
				<Outlet />
			</Grid>
		</Grid>
	)
}

export default Exercise
