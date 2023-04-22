import * as t from '../types'

const initialState = {
	loading: true,
	carouselsWithItems: {},
}

const discover = (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
		case t.GET_MOVIES_REQUEST:
		case t.GET_TV_SHOWS_REQUEST:
			return {
				...state,
				loading: true,
			}
		case t.GET_MOVIES_SUCCESS:
		case t.GET_TV_SHOWS_SUCCESS:
			return {
				...state,
				loading: false,
				carouselsWithItems: {
					...state.carouselsWithItems,
					[payload.key]: payload.data,
				},
			}
		case t.GET_MOVIES_FAIL:
		case t.GET_TV_SHOWS_FAIL:
			return {
				...state,
				loading: false,
			}
		case t.CLEAR_CAROUSELS:
			return {
				...state,
				carouselsWithItems: {},
			}
		case t.ON_LOAD_MORE_ITEMS_SUCCESS:
			return {
				...state,
				carouselsWithItems: {
					...state.carouselsWithItems,
					[payload.key]: {
						...state.carouselsWithItems[payload.key],
						...payload.data,
					},
				},
			}
		default:
			return state
	}
}

export default discover
