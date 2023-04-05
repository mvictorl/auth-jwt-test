import React from 'react'
// import { RootState, store } from '../store'
import { useSelector, useDispatch } from 'react-redux'
import {
	decrement,
	increment,
	selectCount,
} from '../store/slices/counter-slice'

export function Counter() {
	// const count = useSelector((state: RootState) => state.counter.value)
	const count = useSelector(selectCount)

	const dispatch = useDispatch()

	return (
		<div>
			<div>
				<button
					aria-label="Increment value"
					onClick={() => dispatch(increment())}
				>
					Increment
				</button>
				<h2>{count}</h2>
				<button
					aria-label="Decrement value"
					onClick={() => dispatch(decrement())}
				>
					Decrement
				</button>
			</div>
		</div>
	)
}
