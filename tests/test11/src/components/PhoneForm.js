import {useState, useEffect} from 'react'
import {useMutation} from '@apollo/client'

import {EDIT_NUMBER} from '../queries'

const PhoneForm = (props) => {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')

	const [changeNumber, result] = useMutation(EDIT_NUMBER)

	const submit = async (event) => {
		event.preventDefault()

		changeNumber({variables: {name, phone}})

		setName('')
		setPhone('')
	}

	useEffect(() => {
		if (result.data && result.data.editNumber === null) {
			props.setError('Person not found')
		}
	}, [result.data]) // eslint-disable-line

	return (
		<div>
			<h2>Change number</h2>
			<form onSubmit={submit}>
				<div>
					Name <input value={name} onChange={({target}) => setName(target.value)} />
				</div>
				<div>
					Phone <input value={phone} onChange={({target}) => setPhone(target.value)} />
				</div>
				<button type="submit">Change number</button>
			</form>
		</div>
	)
}

export default PhoneForm

