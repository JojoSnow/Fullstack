import {useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {likeBlog, deleteBlog, makeComment} from '../reducers/blogReducer'
import {Button, ListGroup, Form} from 'react-bootstrap'

const Blog = ({blogs}) => {
	const [comment, setComment] = useState('')
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const id = useParams().id
	const blog = blogs.find(b => b.id === id)
	const loggedUser = useSelector(state => state.loggedUser)

	const addLike = async () => {
		dispatch(likeBlog(blog))
	}

	const delBlog = () => {
		const message = `Remove blog ${blog.title} by ${blog.author}?`
		if (window.confirm(message)) {
			dispatch(deleteBlog(blog.id))
			navigate('/')
		}
	}

	const addComment = event => {
		event.preventDefault()
		dispatch(makeComment(blog, comment))
		setComment('')
	}

	return (
		<div>
			<h2 className="my-3">{blog.title}</h2>
			<p>{blog.url}</p>
			<p>{blog.likes} likes</p>
			<Button size="sm" className="mb-2" onClick={addLike}>Like</Button>
			<p>Added by {blog.user.name}</p>
			{loggedUser.username === blog.user.username ? (
				<Button onClick={delBlog}>Remove</Button>
			) : (
				''
			)}

			
			<Form onSubmit={addComment}>
				<Form.Label>Comment:</Form.Label>
				<Form.Control
					onChange={({target}) => setComment(target.value)}
					value={comment}
				/>
				<Button className="mt-2 mb-4" type="submit">Add Comment</Button>
			</Form>
			<h3>Comments</h3>
			<ListGroup key={blog.comments.id}>
				{blog.comments.map(com => (
					<ListGroup.Item key={Date.now()}>{com}</ListGroup.Item>
				))}
			</ListGroup>
		</div>
	)
}

export default Blog
