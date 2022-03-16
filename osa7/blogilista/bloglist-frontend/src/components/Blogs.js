import PropTypes from 'prop-types'
import { ListGroup } from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Blogs = ({blog}) => {

	return (
		<ListGroup id={blog.id}>
			<ListGroup.Item>
				<Link to={`/blogs/${blog.id}`}>
					{blog.title} {blog.author}
				</Link>
			</ListGroup.Item>
		</ListGroup>
	)
}

Blogs.propTypes = {
	blog: PropTypes.object.isRequired,
}

export default Blogs
