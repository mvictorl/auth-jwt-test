require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const auth_router = require('./routers/auth-routes')
const tester_router = require('./routers/tester-routes')
const authErrorMiddleware = require('./middlewares/auth-error-middleware')

const PORT = process.env.SERVER_PORT || 5000

const app = express()

app.disable('x-powered-by')
app.use(express.json())
// app.use(bodyParser.json())
app.use(
	cors({
		origin: true,
		// origin: 'http://localhost:5173',
		credentials: true,
	})
)
app.use(cookieParser())

app.use('/api', auth_router)
app.use('/api', tester_router)
app.use(authErrorMiddleware)

const startServer = () => {
	try {
		const server = app.listen(PORT, () =>
			console.info(
				`\x1b[33m\x1b[3m Web-server is running on port \x1b[31m${
					server.address().port
				}\x1b[0m `
			)
		)
	} catch (e) {
		console.error(e)
	}
}

startServer()
