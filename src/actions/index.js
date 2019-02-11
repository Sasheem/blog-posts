import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPosts = () => async dispatch => {
        // use pre-configured axios instance to make request async
        const response = await jsonPlaceholder.get('/posts');
        dispatch({
            type: 'FETCH_POSTS',
            payload: response.data
        });
};  

export const fetchUser = (id) => async dispatch => {
    const response  = await jsonPlaceholder.get(`/users/${id}`);
    dispatch({ 
        type: 'FETCH_USER',
        payload: response.data
    });
};