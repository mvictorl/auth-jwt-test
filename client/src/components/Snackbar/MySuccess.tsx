import { useState, forwardRef, useCallback } from 'react'
import { styled } from '@mui/material/styles'
import clsx from 'clsx'
import { useSnackbar, SnackbarContent, CustomContentProps } from 'notistack'
import Collapse from '@mui/material/Collapse'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const PREFIX = 'ReportComplete'

const classes = {
	root: `${PREFIX}-root`,
	card: `${PREFIX}-card`,
	typography: `${PREFIX}-typography`,
	actionRoot: `${PREFIX}-actionRoot`,
	icons: `${PREFIX}-icons`,
	expand: `${PREFIX}-expand`,
	expandOpen: `${PREFIX}-expandOpen`,
	paper: `${PREFIX}-paper`,
	checkIcon: `${PREFIX}-checkIcon`,
	button: `${PREFIX}-button`,
}

const StyledSnackbarContent = styled(SnackbarContent)(() => ({
	[`&.${classes.root}`]: {
		'@media (min-width:600px)': {
			minWidth: '344px !important',
		},
	},
	[`& .${classes.card}`]: {
		width: '100%',
	},
	[`& .${classes.typography}`]: {
		color: '#000',
	},
	[`& .${classes.actionRoot}`]: {
		padding: '8px 8px 8px 16px',
		justifyContent: 'space-between',
	},
	[`& .${classes.icons}`]: {
		marginLeft: 'auto',
	},
	[`& .${classes.expand}`]: {
		padding: '8px 8px',
		transform: 'rotate(0deg)',
		color: '#000',
		transition: 'all .2s',
	},
	[`& .${classes.expandOpen}`]: {
		transform: 'rotate(180deg)',
	},
	[`& .${classes.paper}`]: {
		backgroundColor: '#fff',
		padding: 16,
	},
	[`& .${classes.checkIcon}`]: {
		fontSize: 20,
		paddingRight: 4,
	},
	[`& .${classes.button}`]: {
		padding: 0,
		textTransform: 'none',
	},
}))

interface ReportCompleteProps extends CustomContentProps {
	allowDownload?: boolean
}

const ReportComplete = forwardRef<HTMLDivElement, ReportCompleteProps>(
	({ id, ...props }, ref) => {
		const { closeSnackbar } = useSnackbar()
		const [expanded, setExpanded] = useState(false)

		const handleExpandClick = useCallback(() => {
			setExpanded(oldExpanded => !oldExpanded)
		}, [])

		const handleDismiss = useCallback(() => {
			closeSnackbar(id)
		}, [id, closeSnackbar])

		return (
			<StyledSnackbarContent ref={ref} className={classes.root}>
				<Card className={classes.card} style={{ backgroundColor: '#fddc6c' }}>
					<CardActions classes={{ root: classes.actionRoot }}>
						<Typography variant="body2" className={classes.typography}>
							{props.message}
						</Typography>
						<div className={classes.icons}>
							<IconButton
								aria-label="Show more"
								size="small"
								className={clsx(classes.expand, {
									[classes.expandOpen]: expanded,
								})}
								onClick={handleExpandClick}
							>
								<ExpandMoreIcon />
							</IconButton>
							<IconButton
								size="small"
								className={classes.expand}
								onClick={handleDismiss}
							>
								<CloseIcon fontSize="small" />
							</IconButton>
						</div>
					</CardActions>
					<Collapse in={expanded} timeout="auto" unmountOnExit>
						<Paper className={classes.paper}>
							<Typography
								gutterBottom
								variant="caption"
								style={{ color: '#000', display: 'block' }}
							>
								PDF ready
							</Typography>
							<Button size="small" color="primary" className={classes.button}>
								<CheckCircleIcon className={classes.checkIcon} />
								Download now
							</Button>
						</Paper>
					</Collapse>
				</Card>
			</StyledSnackbarContent>
		)
	}
)

ReportComplete.displayName = 'ReportComplete'

export default ReportComplete
