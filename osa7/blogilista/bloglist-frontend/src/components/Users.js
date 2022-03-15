import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Users = ({users}) => {

	return (
		<div>
			<h2>Users</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>blogs created</th>
					</tr>
					{users.map(user =>
						<tr>
							<td>{user.name}</td>
							<td>{user.blogs.length}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default Users