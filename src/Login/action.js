import { GET_INITIAL_LOGIN_DATA } from '../_main/actionTypes';

export async function setUser(userData, dispatch) {
    sessionStorage.setItem('user', JSON.stringify(userData));
    dispatch({
        type: GET_INITIAL_LOGIN_DATA,
        payload: { error: null, data: userData }
    });

    return { isSuccess: true };
}