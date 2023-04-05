import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Counter } from './components/Counter'
import UserList from './components/UserList'
import TodoList from './components/TodoList'
import AuthTest from './components/Auth/AuthTest'

function App() {
	const [count, setCount] = useState(0)

	return (
		<div className="App">
			<AuthTest />
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://reactjs.org" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>

			<Counter />
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '50% 50%',
					width: '100%',
				}}
			>
				<div>
					<TodoList />
				</div>
				<div style={{ paddingTop: '2.5rem' }}>
					<UserList />
				</div>
			</div>
		</div>
	)
}

export default App
