/* eslint-disable no-case-declarations */
// import generateUniqueId from "generate-unique-id";

const initialState = {
    books: [],
    book: null,
}

const bookReducer = (state = initialState, action) => {
    switch (action.type) {

        case "BOOK_GET":
            return {
                ...state,
                books: action.payload,
                book: null
            };

        case "BOOK_DELETE":
            return {
                ...state,
                book: action.payload
            }

        case "BOOK_FETCH":
            return{
                ...state,
                book: action.payload
            }

        default:
            return state;
    }
}

export default bookReducer;