import React from 'react'
import { Outlet } from 'react-router-dom'

function TesterPage() {
	return (
		<>
			<h3>Tester Page</h3>
			<Outlet />
		</>
	)
}

export default TesterPage
