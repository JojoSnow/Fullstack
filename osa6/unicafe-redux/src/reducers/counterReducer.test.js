import deepFreeze from 'deep-freeze'
import counterReducer from './counterReducer'

describe('unicafe reducer', () => {
	const initialState = {
		good: 0,
		ok: 0,
		bad: 0
	}

	test('should return a proper initial state when called with indefined state', () => {
		const state = {}
		const action = {
			type: 'DO_NOTHING'
		}

		const newState = counterReducer(undefined, action)
		expect(newState).toEqual(initialState)
	})

	test('good incremented', () => {
		const action = {
			type: 'GOOD'
		}

		const state = initialState

		deepFreeze(state)
		const newState = counterReducer(state, action)
		expect(newState).toEqual({
			good: 1,
			ok: 0,
			bad: 0
		})
	})

	test('ok incremented', () => {
		const action = {
			type: 'OK'
		}

		const state = initialState

		deepFreeze(state)
		const newState = counterReducer(state, action)
		expect(newState).toEqual({
			good: 0,
			ok: 1,
			bad: 0
		})
	})

	test('bad incremented', () => {
		const action = {
			type: 'BAD'
		}

		const state = initialState

		deepFreeze(state)
		const newState = counterReducer(state, action)
		expect(newState).toEqual({
			good: 0,
			ok: 0,
			bad: 1
		})
	})

	test('zero incremented', () => {
		const changedState = {
			good: 1,
			ok: 1,
			bad: 1
		}

		const action = {
			type: 'ZERO'
		}

		const state = changedState

		deepFreeze(state)
		const newState = counterReducer(state, action)
		expect(newState).toEqual({
			good: 0,
			ok: 0,
			bad: 0
		})
	})
})