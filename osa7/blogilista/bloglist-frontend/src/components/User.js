import {useParams} from 'react-router-dom'
import {ListGroup} from 'react-bootstrap'

const User = ({users}) => {
	const id = useParams().id
	const user = users.find(u => u.id === id)
	return (
		<div>
			<h2 className="my-3">{user.name}</h2>
			<h3 className="pt-2">Added Blogs</h3>
			<ListGroup className="mt-3">
				{user.blogs.map(blog => (
					<ListGroup.Item key={id}>{blog.title}</ListGroup.Item>
				))}
			</ListGroup>
		</div>
	)
}

export default User
