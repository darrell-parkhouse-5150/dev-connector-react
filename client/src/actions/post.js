import api from '../util/api'
import { setAlert } from './alert'
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from './types'

export const getPosts = () => async (dispatch) => {
    try {
        const res = await api.get('/post')

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}