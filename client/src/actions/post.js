import api from '../util/api'
import { setAlert } from './alert'
import {
    GET_POSTS,
    POST_ERROR,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
    UPDATE_LIKES
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
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const addLike = (id) => async (dispatch) => {
    try {
        const res = await api.post(`/posts/like/${id}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusError, status: err.response.status }
        })
    }
}

export const removeLike = (id) => async (dispatch) => {
    try {
        const res = await api.post(`/posts/unlike/${id}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data}
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusError, status: err.response.status }
        })
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.delete(`/posts${id}`)

        dispatch({
            type: DELETE_POST,
            payload: id
        })

        dispatch(setAlert('post removed', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusError, status: err.response.status }
       })
    }
}

export const AddPost = (formData) => async (dispatch) => {
    try {
        const res = await api.post('/posts', formData);

        dispatch({
            type: ADD_POST,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
export const getPost = (id) => async (dispatch) => {
    try {
        const res = await api.post(`/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
export const addComment = (postId, formData) => async (dispatch) => {
    try {
        const res = await api.post(`/posts/comments/${postId}`, formData);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })

        dispatch(setAlert('Comment added', 'success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

