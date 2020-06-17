import {createStore, combineReducers,applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import{productListReducer, productDetailsReducer} from './reducers/productReducers';
import{cartReducer} from './reducers/cartReducers'

const initialState={};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart:cartReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__|| compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;