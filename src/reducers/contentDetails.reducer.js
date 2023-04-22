import * as t from '../types'

const initialState = {
	loading: true,
	item: null,
	error: false,
}

const contentDetails = (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
		case t.GET_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			}
		case t.GET_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				item: payload,
				error: false,
			}
		case t.GET_DETAILS_FAIL:
			return {
				...state,
				loading: false,
				error: true,
			}
		case t.CLEAR_DETAILS:
			return {
				...state,
				loading: true,
				item: null,
				error: false,
			}
		default:
			return state
	}
}

export default contentDetails
