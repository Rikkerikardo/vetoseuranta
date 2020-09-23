import {createStore, combineReducers, applyMiddleware} from "redux"
import resultReducer from "./reducers/ottelut"
import kassaReducer from "./reducers/kassa"
import thunk from "redux-thunk"

const reducer = combineReducers({
  results: resultReducer,
  kassa: kassaReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
