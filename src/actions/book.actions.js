import {
    ADD_BOOK_ERROR,
    ADD_BOOK_LOADING,
    ADD_BOOK_SUCCESS,
    DELETE_BOOK_ERROR,
    DELETE_BOOK_LOADING,
    DELETE_BOOK_SUCCESS,
    EDIT_BOOK_ERROR,
    EDIT_BOOK_LOADING,
    EDIT_BOOK_SUCCESS,
    FETCH_BOOK_ERROR,
    FETCH_BOOK_LOADING,
    FETCH_BOOK_SUCCESS
}
from './types';
import axios from 'axios';
import { history } from '../index';

const url = ''

//CREATE____________________________________________________________________________________________

export const createBookSuccess = (data) =>{
    return{
        type: ADD_BOOK_SUCCESS,
        payload: data,
    }
}

export const createBookError = (data) =>{
    return{
        type: ADD_BOOK_ERROR,
        payload: data,
    }
}

export const createBook = (book) =>{
    if(book.id){
        const data={
            id: book.id,
            title: book.title,
            author: book.author,
            year: book.year,
        }
        return (dispatch) =>{
            dispatch(editBook(data));
        }
    }else{
    const data = {
        title: book.title,
        author: book.author,
        year: book.year,
    }
    return (dispatch) =>{
        axios.post(url,data)
        .then(response => {
            const id = response.data;
            axios.get(`${url}/${id}`)
            .then(response => {
                const data = response.data;
                const normalizedData={
                    id: data.ID,
                    title: data.Title,
                    author: data.Author,
                    year: data.Year,
                }
                dispatch(createBookSuccess(normalizedData));
                history.push('/');
            }).catch(error => {
                const errorPayload = {}
                errorPayload['message']=error.response.data.message;
                errorPayload['status']=error.response.status;
                dispatch(createBookError(error));
            })
        }).catch(error => {
            const errorPayload = {}
            errorPayload['message']=error.response.data.message;
            errorPayload['status']=error.response.status;
            dispatch(createBookError(error));
        })
    }
  }
}

//FETCH____________________________________________________________________________________________

export const fetchBooksSuccess = (data) =>{
    return{
        type: FETCH_BOOK_SUCCESS,
        payload: data,
    }
}

export const fetchBooksLoading = (data) =>{
    return{
        type: FETCH_BOOK_LOADING,
        payload: data,
    }
}

export const fetchBooksError = (data) =>{
    return{
        type: FETCH_BOOK_ERROR,
        payload: data,
    }
}

const normalizeData = (data) => {
    const arr = data.map(item=>{
        const keys = Object.keys(item);

        keys.forEach(k=>{
            item[k.toLowerCase()] = item[k];
            delete item[k];
        })
        return item;
    })
    return arr;
}

export const fetchBooks = () =>{
    let isLoading = true;

    return (dispatch) => {
        dispatch(fetchBooksLoading(isLoading));
        return axios.get(url)
        .then(response => {
            const data = normalizeData(response.data);
            dispatch(fetchBooksSuccess(data));
            isLoading = false;
            dispatch(fetchBooksLoading(isLoading));
            isLoading = false;
        }).catch(error =>{
            const errorPayload = {}
            // errorPayload['message'] = error.response.data.message;
            // errorPayload['status'] = error.response.status;
            // dispatch(fetchBooksError(errorPayload));
            isLoading = false;
            dispatch(fetchBooksLoading(isLoading));
        })
    }
}

//EDIT____________________________________________________________________________________________

export const editBookError = (data) =>{
    return{
        type: EDIT_BOOK_SUCCESS,
        payload: data,
    }
}

export const editBookSuccess = (data) =>{
    return{
        type: EDIT_BOOK_ERROR,
        payload: data,
    }   
}


export const editBook = (data) =>{
    const id = data.id;
    return (dispatch) =>{
        return axios.put(url,data)
        .then(()=>{
            return axios.get(`${url}/${id}`)
                   .then((response)=>{
                        dispatch(editBookSuccess(response.data));
                        history.push('/');
                   }).catch((error)=>{
                        const errorPayload = {}
                        // errorPayload['message'] = error.response.data.message;
                        // errorPayload['status'] = error.response.status;
                        // dispatch(editBookError(errorPayload));
                   })
        }).catch((error)=>{
            const errorPayload = {}
            // errorPayload['message'] = error.response.data.message;
            // errorPayload['status'] = error.response.status;
            // dispatch(editBookError(errorPayload));
        })
    }
}

//DELETE____________________________________________________________________________________________

export const deleteBook = (id) => {
    return (dispatch) => {
        return axios.delete(`${url}/${id}`).then(() => {
            dispatch(deleteBookSuccess(id));
        }).catch(error => {
            const errorPayload = {}
            // errorPayload['message'] = error.response.data.message;
            // errorPayload['status'] = error.response.status;
            // dispatch(editBookError(errorPayload));
            dispatch(deleteBookError(error));
        });
    }
};

export const deleteBookSuccess = (id) => {
    return {
        type: DELETE_BOOK_SUCCESS,
        payload: {
            id: id,
        },
    };
};

export const deleteBookError = (data) => {
    return {
        type: DELETE_BOOK_ERROR,
        payload: data,
    }
};