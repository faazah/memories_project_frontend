import * as api from '../api/index';
import { CREATE, DELETE, END_LOADING, FETCH_ALL,FETCH_BY_SEARCH, FETCH_POST, LIKE, START_LOADING, UPDATE } from '../constants/actionTypes';

//ACTION CREATOR ---> are the functions which returns actions that consist acionType and the payload.

export const getPost = (id) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING})
        const {data} = await api.fetchPost(id);

        dispatch({type: FETCH_POST, payload: data});
        
        dispatch({type: END_LOADING})
    }catch(err){
        console.log(err);
    }
}


export const getPosts = (page) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING})
        const {data} = await api.fetchPosts(page);
        // console.log(data);
        dispatch({type: FETCH_ALL, payload: data});
        
        dispatch({type: END_LOADING})
    }catch(err){
        console.log(err);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) =>{
    try {
        dispatch({type: START_LOADING})
        const {data: {data}} = await api.fetchPostsBySearch(searchQuery);

        dispatch({type: FETCH_BY_SEARCH, payload: {data}});

        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post, navigate) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING})

        const {data} = await api.createPost(post);
        navigate(`/posts/${data._id}`)

        dispatch({type: CREATE, payload: data})

        dispatch({type: END_LOADING})
    }catch(err){
        console.log(err);
    }
}

export const updatePost = (id, post) =>async(dispatch) => {
    try{
        const {data} = await api.updatePost(id, post);
        dispatch({type: UPDATE, payload: data})
    }catch(err){
        console.log(err);
    }
}

export const deletePost = (id) => async(dispatch) =>{
    try{
        await api.deletePost(id);
        dispatch({type: DELETE, payload: id})
    }catch(err){
        console.log(err);
    }
}

export const likePost = (id) => async(dispatch) =>{
    try{
        const {data} = await api.likePost(id);
        dispatch({type: LIKE , payload: data})
    }catch(err){
        console.log(err);
    }
}