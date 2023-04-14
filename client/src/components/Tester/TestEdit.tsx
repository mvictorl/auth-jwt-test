import React from 'react'
import { useParams } from 'react-router-dom'

function TestEdit() {
	const { id } = useParams()
	return (
		<>
			<h4>Test Edit Component</h4>
			<span>{id}</span>
		</>
	)
}

export default TestEdit
