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
import { books } from '../data';
import axios from 'axios';

const url = ''

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