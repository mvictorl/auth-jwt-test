import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { format, formatDistance, parseISO, Locale } from 'date-fns'
import { getDateFnfLocale } from '../../utils/date-fns-locales'
// @mui
import {
	Avatar,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Collapse,
	Container,
	IconButton,
	IconButtonProps,
	Typography,
	styled,
} from '@mui/material'
import { red } from '@mui/material/colors'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useGetOneTestQuery } from '../../store/APIs/testerApi'
import { useAppSelector } from '../../store/hooks'
import { selectLocale } from '../../store/slices/local-slice'

// function TestDetails() {
// 	const { id } = useParams()
// 	const { data } = useGetOneTestQuery(id || '')

// 	console.log(data)

// 	return (
// 		<>
// 			<h4>Test Details Component</h4>
// 			<h5>{data?.title}</h5>
// 			<h6>{data?.description}</h6>
// 			<p>{data?.questions.length}</p>
// 		</>
// 	)
// }
interface ExpandMoreProps extends IconButtonProps {
	expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
	const { expand, ...other } = props
	return <IconButton {...other} />
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}))

const TestDetails = () => {
	const { id } = useParams()
	const { data } = useGetOneTestQuery(id || '')

	const locale = useAppSelector(selectLocale)

	const [expanded, setExpanded] = React.useState(false)

	const handleExpandClick = () => {
		setExpanded(!expanded)
	}

	return (
		<Container maxWidth="md">
			<Card>
				<CardHeader
					avatar={
						<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
							R
						</Avatar>
					}
					action={
						<IconButton aria-label="settings">
							<MoreVertIcon />
						</IconButton>
					}
					title={data?.author.username}
					subheader={
						data
							? formatDistance(parseISO(data.createdAt), new Date(), {
									locale: getDateFnfLocale(locale),
							  })
							: null
					}
				/>
				{/* <CardMedia
				component="img"
				height="194"
				image="/static/images/cards/paella.jpg"
				alt="Paella dish"
			/> */}
				<CardContent>
					<Typography variant="h6" color="text.secondary">
						{data?.title}
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton aria-label="add to favorites">
						<FavoriteIcon />
					</IconButton>
					<IconButton aria-label="share">
						<ShareIcon />
					</IconButton>
					<ExpandMore
						expand={expanded}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</ExpandMore>
				</CardActions>
				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<CardContent>
						<Typography paragraph>Method:</Typography>
						<Typography paragraph>
							Heat 1/2 cup of the broth in a pot until simmering, add saffron
							and set aside for 10 minutes.
						</Typography>
						<Typography paragraph>
							Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
							over medium-high heat. Add chicken, shrimp and chorizo, and cook,
							stirring occasionally until lightly browned, 6 to 8 minutes.
							Transfer shrimp to a large plate and set aside, leaving chicken
							and chorizo in the pan. Add pimentón, bay leaves, garlic,
							tomatoes, onion, salt and pepper, and cook, stirring often until
							thickened and fragrant, about 10 minutes. Add saffron broth and
							remaining 4 1/2 cups chicken broth; bring to a boil.
						</Typography>
						<Typography paragraph>
							Add rice and stir very gently to distribute. Top with artichokes
							and peppers, and cook without stirring, until most of the liquid
							is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
							reserved shrimp and mussels, tucking them down into the rice, and
							cook again without stirring, until mussels have opened and rice is
							just tender, 5 to 7 minutes more. (Discard any mussels that don't
							open.)
						</Typography>
						<Typography>
							Set aside off of the heat to let rest for 10 minutes, and then
							serve.
						</Typography>
					</CardContent>
				</Collapse>
			</Card>
		</Container>
	)
}

export default TestDetails
