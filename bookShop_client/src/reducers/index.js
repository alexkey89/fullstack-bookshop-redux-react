"use strict";
import {combineReducers} from 'redux';
import {booksReducers} from './booksReducers';
import {cartReducers} from './cartReducer';

export default combineReducers({
    books: booksReducers,
    cart: cartReducers
})
