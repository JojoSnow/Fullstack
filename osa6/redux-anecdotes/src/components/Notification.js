import {useSelector} from 'react-redux'
import {voteNotification} from '../reducers/notificationReducer'

const Notification = () => {
	voteNotification()
	const notification = useSelector(state => state.notification)
	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1
	}

	return (
		<div style={style}>
			{notification}
		</div>
	)
}

export default Notification