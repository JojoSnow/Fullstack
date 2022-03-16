import {useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {likeBlog, deleteBlog, makeComment} from '../reducers/blogReducer'

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
			<h2>{blog.title}</h2>
			<p>{blog.url}</p>
			<p>{blog.likes} likes</p>
			<button onClick={addLike}>Like</button>
			<p>Added by {blog.user.name}</p>
			{loggedUser.username === blog.user.username ? (
				<button onClick={delBlog}>Remove</button>
			) : (
				''
			)}

			<h3>Comments</h3>
			<form onSubmit={addComment}>
				<input
					onChange={({target}) => setComment(target.value)}
					value={comment}
				/>
				<button type="submit">Add Comment</button>
			</form>

			<ul key={blog.comments.id}>
				{blog.comments.map(com => (
					<li>{com}</li>
				))}
			</ul>
		</div>
	)
}

export default Blog
