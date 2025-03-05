// import { FETCH_TODOS, UPDATE_TODO, DELETE_TODO } from '../_main/actionTypes';
// import callFetch from '../_main/fetch';
// import { API_URL } from '../_main/constants'

// const syncReducer = (type, payload) => ({
//     type,
//     payload,
// });

// export function fetchTodos(dispatch) {
//     return callFetch(API_URL, {
//         method: "GET",
//     })
//         .then((res) => {
//             dispatch(syncReducer(FETCH_TODOS, res));
//             return { isSuccess: true, result: res };
//         })
//         .catch((error) => {
//             console.error(error);
//             return { isSuccess: false, error: error.message };
//         });
// }

// export function updateTodo(dispatch, id, updatedData) {
//     return callFetch(`${API_URL}/${id}`, {
//         method: "PUT",
//         body: JSON.stringify(updatedData),
//         headers: { "Content-Type": "application/json" },
//     })
//         .then((res) => {
//             dispatch(syncReducer(UPDATE_TODO, { ...updatedData, id }));
//             return { isSuccess: true, result: res };
//         })
//         .catch((error) => {
//             console.error(error);
//             return { isSuccess: false, error: error.message };
//         });
// }

// export function deleteTodo(dispatch, id) {
//     return callFetch(`${API_URL}/${id}`, {
//         method: "DELETE",
//     })
//         .then(() => {
//             dispatch(syncReducer(DELETE_TODO, { id }));
//             return { isSuccess: true };
//         })
//         .catch((error) => {
//             console.error(error);
//             return { isSuccess: false, error: error.message };
//         });
// }


import { FETCH_TODOS, UPDATE_TODO, DELETE_TODO } from '../_main/actionTypes';
import callFetch from '../_main/fetch';
import { API_URL } from '../_main/constants';

const syncReducer = (type, payload) => ({
    type,
    payload,
});

export function fetchTodos(dispatch) {
    return callFetch(API_URL, {
        method: "GET",
    })
        .then((res) => {
            dispatch(syncReducer(FETCH_TODOS, res));
            return { isSuccess: true, result: res };
        })
        .catch((error) => {
            console.error(error);
            return { isSuccess: false, error: error.message };
        });
}
export function updateTodo(id, updatedData, dispatch) {
    dispatch({ type: UPDATE_TODO, payload: { id, updatedData } });
}

export function deleteTodo(id, dispatch) {
    dispatch({ type: DELETE_TODO, payload: id });
}

