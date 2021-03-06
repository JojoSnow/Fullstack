import {useState, useEffect} from 'react'
import axios from 'axios'

const useField = (type) => {
	const [value, setValue] = useState('')

	const onChange = (event) => {
		setValue(event.target.value)
	}
	
	return {
		type, value, onChange
	}
}

const useCountry = (name) => {
	const [country, setCountry] = useState(null)
	
	useEffect(() => {
		axios
			.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
			.catch(error => {
				console.log(error)
				setCountry(null)
			})
			.then(response => {
				if (response) {
					setCountry(response.data[0])
				}
			})
	}, [name])

	if (country) {
		return country
	}
}

const Country = ({country}) => {
	if (!country) {
		return <div>not found...</div>
	}

	return (
		<div>
			<h3>{country.name.common}</h3>
			<div>Population: {country.population}</div>
			<div>Capital: {country.capital}</div>
			<img src={country.flags.png} height="100" alt={`flag of ${country.name.common}`} />
		</div>
	)
}

function App() {
	const nameInput = useField('text')
	const [name, setName] = useState('')
	const country = useCountry(name)
	const fetch = (e) => {
		e.preventDefault()
		setName(nameInput.value)
	}

	return (
		<div>
			<form onSubmit={fetch}>
				<input {...nameInput} />
				<button type="submit">Find</button>	
			</form>

			<Country country={country} />
		</div>
	)
}

export default App
