import React from 'react'
import { useParams } from 'react-router-dom'

function TestDetails() {
	const { id } = useParams()
	return (
		<>
			<h4>Test Details Component</h4>
			<span>{id}</span>
		</>
	)
}

export default TestDetails
