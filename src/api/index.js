import axios from 'axios';

const API = axios.create({baseURL: 'https://memories-project-backend-faazah.onrender.com/'});

API.interceptors.request.use((req) =>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
});
// const url = 'https://memories-backend-faazah.onrender.com/posts';

export const fetchPost = (id) => API.get(`/posts/${id}`)
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch =(searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPost = (newPost) => API.post('posts/create', newPost);
export const updatePost = (id, updatedPost) => API.patch(`posts/update/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`posts/delete/${id}`);
export const likePost = (id) => API.patch(`posts/likePost/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)