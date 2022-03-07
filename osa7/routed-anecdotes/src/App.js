import React, {useState} from 'react'
import {Routes, Route, useMatch} from 'react-router-dom'

import Footer from './components/Footer'
import Anecdotes from './components/Anecdotes'
import NewAnecdote from './components/NewAnecdote'
import Menu from './components/Menu'
import About from './components/About'
import Anecdote from './components/Anecdote'

const App = () => {
	const [anecdotes, setAnecdotes] = useState([
		{
			content: 'If it hurst, do it more often',
			author: 'Jez Humble',
			info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
			votes: 0,
			id: 1
		},
		{
			content: 'Premature optimization is the root of evil',
			author: 'Donald Knuth',
			info: 'http://wiki.c2.com/?PrematureOptimization',
			votes: 0,
			id: 2
		}
	])
	const [notification, setNotification] = useState('')

	const addAnecdote = (anec) => {
		anec.id = Math.round(Math.random() * 100000)
		setAnecdotes(anecdotes.concat(anec))
		makeNotification(anec)
	}

	const makeNotification = (anec) => {
		setNotification(`A new anecdote ${anec.content}`)
		setTimeout(() => {
			setNotification('')
		}, 5000)
	}

	const anecdoteById = (id) =>
		anecdotes.find(a => a.id === id)

	const vote = (id) => {
		const anec = anecdoteById(id)
		const voted = {
			...anec,
			votes: anecdote.votes + 1
		}

		setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
	}

	const match = useMatch('/anecdotes/:id')
	const anecdote = match
	? anecdotes.find(a => a.id === Number(match.params.id))
	: null

	return (
		<div>
			<h1>Software anedotes</h1>
			<Menu />
			<p>{notification}</p>

			<Routes>
				<Route path="" element={<Anecdotes anecdotes={anecdotes} />} />
				<Route path="/create" element={<NewAnecdote create={addAnecdote} />} />
				<Route path="/about" element={<About />} />
				<Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
			</Routes>

			<Footer />
		</div>
	)
}

export default App