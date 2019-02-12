import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    // next step is to get the list of posts that were just fetched above
    // its done async so we shouldn't attempt to get it until we know for sure we will have it
    // thats why we are putting the await keyword before the dispatch(fetchPosts())    
    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();
};

export const fetchPosts = () => async dispatch => {
        // use pre-configured axios instance to make request async
        const response = await jsonPlaceholder.get('/posts');
        dispatch({
            type: 'FETCH_POSTS',
            payload: response.data
        });
};  

// an arrow function that returns an arrow function 
// with a call to the _fetchUser function with id and dispatch
export const fetchUser = (id) => async dispatch => {

    // actually makes the request and dispatches an action
    const response = await jsonPlaceholder.get(`/users/${id}`);
    dispatch({
        type: 'FETCH_USER',
        payload: response.data
    });
};


// private function - the underscore indicates to other engineers will see this and 
// know not to call it unless they know what they are doing
/*
    I call it in a separate function b/c when it was all called together, 
    a new version of the fetchUser was being returned with a new memoize function
*/
// const _fetchUser = _.memoize(async (id, dispatch) => {
//     // actually makes the request and dispatches an action
//     const response = await jsonPlaceholder.get(`/users/${id}`);
//     dispatch({
//         type: 'FETCH_USER',
//         payload: response.data
//     });
// });