import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import { base_reducer } from '../reducers/base_reducer';

const store = createStore(
  combineReducers({
      base : base_reducer,
  }),
  applyMiddleware(thunk),
);
export default store;
