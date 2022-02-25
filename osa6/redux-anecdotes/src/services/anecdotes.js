import axios from 'axios'

const baseUrl= 'http://localhost:3001/anecdotes'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const createNew = async (content) => {
	const object = {content, votes: 0}
	const response = await axios.post(baseUrl, object)
	return response.data
}

const addVote = async (content, vote, id) => {
	const votes = vote + 1
	const newObject = {content, votes, id}
	const request = await axios.put(`${baseUrl}/${id}`, newObject)
	return request.data
}

export default {getAll, createNew, addVote}