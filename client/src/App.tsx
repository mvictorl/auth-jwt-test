import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
	const [count, setCount] = useState(0)

	return (
		<div
			className="
        font-sans
        text-base
        font-normal
        m-0
        flex
        flex-col
        place-items-center
        min
      "
		>
			<div className="flex flex-row">
				<a
					href="https://vitejs.dev"
					target="_blank"
					className="
            font-medium
            text-violet-400
            decoration-inherit
            hover:text-violet-500
          "
				>
					<img src="/vite.svg" className="logo" alt="Vite logo" />
				</a>
				<a
					href="https://reactjs.org"
					target="_blank"
					className="
            font-medium
            text-violet-400
            decoration-inherit
          "
				>
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1
				className="
          m-0

        "
			>
				Vite + React
			</h1>
			<div className="card">
				<button
					onClick={() => setCount(count => count + 1)}
					className="
            border-r-8
            border-transparent
          "
				>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</div>
	)
}

export default App
