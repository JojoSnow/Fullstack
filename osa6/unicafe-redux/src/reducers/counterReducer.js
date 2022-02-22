const initialState = {
	good: 0,
	ok: 0,
	bad: 0
}

const counterReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'GOOD':
			const good = state.good + 1
			const changedGood = {...state, good: good}
			state = changedGood
			return state
		case 'OK':
			const ok = state.ok + 1
			const changedOk = {...state, ok: ok}
			state = changedOk
			return state
		case 'BAD':
			const bad = state.bad + 1
			const changedBad = {...state, bad: bad}
			state = changedBad
			return state
		case 'ZERO':
			const changed = {
				good: 0,
				ok: 0,
				bad: 0
			}
			state = changed
			return state
		default:
			return state
	}
}

export default counterReducer