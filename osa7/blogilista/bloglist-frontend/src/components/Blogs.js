import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const Blogs = ({blog}) => {
	const blogStyle = {
		border: 'solid',
		padding: '5px',
		marginBottom: '5px' 
	}

	return (
		<div style={blogStyle} id={blog.id}>
			<Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
		</div>
	)
}

Blogs.propTypes = {
	blog: PropTypes.object.isRequired,
}

export default Blogs