import {createStore, combineReducers,applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import{productListReducer, productDetailsReducer, productSaveReducer} from './reducers/productReducers';
import{cartReducer} from './reducers/cartReducers'
import { userSigninReducer, userRegisterReducer } from './reducers/userReducers';

const cartItems= Cookie.getJSON("cartItems") ||[];
const userInfo= Cookie.getJSON("userInfo") || null;

const initialState={cart:{cartItems}, userSignin:{userInfo}};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart:cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__|| compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;