import { combineReducers } from 'redux'

import discover from './discover.reducer'
import contentDetails from './contentDetails.reducer'

export default combineReducers({ discover, contentDetails })
