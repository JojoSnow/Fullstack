import React, {useState, useImperativeHandle, forwardRef} from 'react'
import {Button} from 'react-bootstrap'

const Togglable = forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = {display: visible ? 'none' : ''}
	const showWhenVisible = {display: visible ? '' : 'none'}

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return {toggleVisibility}
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				<Button className="my-2" onClick={toggleVisibility}>{props.buttonLabel}</Button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<Button className="mt-1 mb-3" onClick={toggleVisibility}>Cancel</Button>
			</div>
		</div>
	)
})

Togglable.displayName = 'Togglable'

export default Togglable
