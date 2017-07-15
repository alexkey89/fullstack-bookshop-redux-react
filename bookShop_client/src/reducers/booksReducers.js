"use strict";
//BOOKS REDUCERS

export function booksReducers(state={
    books: []
}, action){
    
    switch(action.type){

        case "FETCH_BOOKS":
        return {...state, books: [...action.payload]}
        break;

        case "POST_BOOK": //concat the books to u can append third book (avoid .push())
        // let books = state.books.concat(action.payload);
        // return {books}; changed to follow spread operator (copy of arrays)
        return {books: [...state.books, ...action.payload], msg: 'Saved! Click to continue', style: 'success', validation: 'success'}
        break;

        case "POST_BOOK_REJECTED": 
        return {...state, msg: 'Please, try again. Error occured', style: 'danger', validation: 'error'}
        break;

        case "RESET_BUTTON": 
        return {...state, msg: null, style: 'primary', validation: null}
        break;
        
        case "DELETE_BOOK": 
        //create copy of current arrays
        const currentBookToDelete = [...state.books]
        //Determine at which index in books array is the book to be deleted
        const indexToDelete = currentBookToDelete.findIndex(
            function(book){
                return book._id.toString() === action.payload
            }
        )
        //slice to remove the book at specific index
        return {books: [...currentBookToDelete.slice(0,indexToDelete),
            ...currentBookToDelete.slice(indexToDelete + 1)]}

        case "UPDATE_BOOK":
        //copy of array
        const currentBookToUpdate = [...state.books]
        //determine the index of book to be updated
        const indexToUpdate = currentBookToUpdate.findIndex(
            function(book){
                return book._id === action.payload._id
            }
        )
        //create new book obj with new values but with same array index
        //replace title by new title from payload
        const newBookToUpdate = {
            ...currentBookToUpdate[indexToUpdate],
            title: action.payload.title,
            description: action.payload.description
        }
        console.log('what is it newBookToUpdate', newBookToUpdate)

        //slice replace item with new one and append the rest of the array
        return {books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
            ...currentBookToUpdate.slice(indexToUpdate + 1)]}
        break;
    }
    return state;
}