import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {likeBlog, deleteBlog} from '../reducers/blogReducer'

const Blog = ({blogs}) => {
	const dispatch = useDispatch()
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
		}
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
		</div>
	)
	
}

export default Blog