import {useState} from 'react'
import {useMutation} from '@apollo/client'

import {CREATE_PERSON, ALL_PERSONS} from '../queries'

const PersonForm = (props) => {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [street, setStreet] = useState('')
	const [city, setCity] = useState('')

	const [createPerson] = useMutation(CREATE_PERSON, {
		onError: (error) => {
			props.setError(error.graphQLErrors[0].message)
		},
		update: (cache, response) => {
			cache.updateQuery({query: ALL_PERSONS}, ({allPersons}) => {
				return {
					allPersons: allPersons.concat(response.data.addPerson)
				}
			})
		}
	})

	const submit = async (e) => {
		e.preventDefault()

		createPerson({
			variables: {
				name, street, city,
				phone: phone.length > 0 ? phone : undefined
			}
		})

		setName('')
		setPhone('')
		setStreet('')
		setCity('')
	}

	return (
		<div>
			<h2>Create New</h2>
			<form onSubmit={submit}>
				<div>
					Name <input value={name} onChange={({target}) => setName(target.value)} />
				</div>
				<div>
					Phone <input value={phone}  onChange={({target}) => setPhone(target.value)} />
				</div>
				<div>
					Street <input value={street}  onChange={({target}) => setStreet(target.value)} />
				</div>
				<div>
					City <input value={city}  onChange={({target}) => setCity(target.value)} />
				</div>
				<button type="submit">Add</button>
			</form>
		</div>
	)
}

export default PersonForm