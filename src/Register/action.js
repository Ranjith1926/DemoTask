import { REGISTER_USER, UPDATE_USER, DELETE_USER } from '../_main/actionTypes';

export function registerUser(userData, dispatch) {
    sessionStorage.setItem('user', JSON.stringify(userData));
    dispatch({
        type: REGISTER_USER,
        payload: userData,
    });
}

export function updateUser(id, updatedUser, dispatch) {
    dispatch({
        type: UPDATE_USER,
        payload: { id, updatedUser },
    });
}

export function deleteUser(id, dispatch) {
    dispatch({
        type: DELETE_USER,
        payload: id,
    });
}
