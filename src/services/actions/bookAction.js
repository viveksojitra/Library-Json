import axios from "axios"
import generateUniqueId from "generate-unique-id"

export const getRecord = (data) => {
    return {
        type: "BOOK_GET",
        payload: data
    }
};

export const deleteRecord = (id) => {
    return {
        type: "BOOK_DELETE",
        payload: id
    }
}

export const fetchRecord = (data) => {
    return {
        type: "BOOK_FETCH",
        payload: data
    }
}

export const bookGetAsync = () => {
    return (dispatch) => {

        axios.get('http://localhost:3000/books')
            .then((res) => {
                console.log("SUCCESS", res.data);
                dispatch(getRecord(res.data));
            })
            .catch((error) => {
                console.log("ERROR", error);
            });
    };
};

export const bookPostAsync = (data) => {
    return (dispatch) => {
        data.id = generateUniqueId({
            length: 4,
            useLetters: false,
        });

        axios.post('http://localhost:3000/books', data)
            .then((res) => {
                console.log("SUCCESS", res.data);
                dispatch(bookGetAsync());
            })
            .catch((error) => {
                console.error("ERROR", error);
            });
    };
};


export const bookDeleteAsync = (id) => {
    return (dispatch) => {

        axios.delete(`http://localhost:3000/books/${id}`).then((res) => {
            console.log("DELETE", res.data);
            dispatch(deleteRecord(res.data))
            dispatch(bookGetAsync())
        }).catch((error) => {
            console.log("ERROR", error);
        })
    }
}

export const bookFetchAsync = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:3000/books/${id}`).then((res) => {
            console.log(res.data);
            dispatch(fetchRecord(res.data))
        }).catch((error) => {
            console.log("ERROR", error);
        })
    }
} 

export const bookUpdateAsync = (data) => {
    return (dispatch) => {
        axios.put(`http://localhost:3000/books/${data.id}`, data).then((res) => {
            console.log(res.data);
            dispatch(bookGetAsync());
        }).catch((error) => {
            console.log("ERROR", error)
        })
    }
}