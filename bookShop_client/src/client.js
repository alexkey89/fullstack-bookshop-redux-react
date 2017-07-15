"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from './reducers/index';
import {addToCart} from './actions/cartAction';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';

const middleware = applyMiddleware(thunk, logger)
const store = createStore(reducers, middleware);

import BooksList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BooksForm from './components/pages/booksForm';
import Main from './main';

const Routes = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={BooksList}></IndexRoute>
                <Route path="/admin" component={BooksForm}></Route>
                <Route path="/cart" component={Cart}></Route>
            </Route>
        </Router>
    </Provider>
)
ReactDOM.render(
    Routes,document.getElementById('app')
)

/***BOOK ACTIONS***/

//POST BOOKS
// store.dispatch(postBooks([{
//     id: 1,
//     title: 'book title',
//     description: 'book description',
//     price: 40.15
// },{
//     id: 2,
//     title: 'second book title',
//     description: 'second book description',
//     price: 22.15 
// }]))


//DISPATCH SECOND ACTION TO POST A NEW BOOK

// store.dispatch(postBooks([{
//     id: 3,
//     title: 'third book title',
//     description: 'third book description',
//     price: 30
// }]))

// store.dispatch(deleteBooks({id: 1}))

// store.dispatch(updateBooks({
//     id: 2,
//     title: 'second book title changed - updated hahah',
//     description: 'updated description hahaa'
// }))


// /***CART ACTIONS***/

// //add to cart
// store.dispatch(addToCart([{id: 2}]))