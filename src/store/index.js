import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../store/reducers/index'

let store = createStore(rootReducer, compose(applyMiddleware(thunk)))
export default store