import { GET_INITIAL_LOGIN_DATA } from '../_main/actionTypes';

const initials = { data: JSON.parse(sessionStorage.getItem('user')) || {} };

export default function loginReducer(state = initials, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_INITIAL_LOGIN_DATA:
            return {
                ...state,
                data: payload.data,
                error: payload.error
            };
        default:
            return state;
    }
}
