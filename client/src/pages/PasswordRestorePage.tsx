import React from 'react'
import { Outlet } from 'react-router-dom'

function PasswordRestorePage() {
	return (
		<>
			<h3>Restore password</h3>
			<Outlet />
		</>
	)
}

export default PasswordRestorePage
