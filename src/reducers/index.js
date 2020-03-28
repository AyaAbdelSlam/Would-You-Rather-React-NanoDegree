import { combineReducers } from 'redux'
import authedUser from './authed-user';
import users from './users'
import questions from './questions'

export default combineReducers({
  authedUser,
  users,
  questions
  //loadingBar: loadingBarReducer
}) 