import axios from 'axios';
import * as actionTypes from './actionsTypes';
import { tap, map, switchMap, catchError, delayWhen, mapTo } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of, from, timer } from 'rxjs';

export const authStart = ({ email, password, isSignup }) => ({
    type: actionTypes.AUTH_START,
    payload: { email, password, isSignup }
});

export const authSuccess = ({ idToken: token, localId, expiresIn }) => ({
    type: actionTypes.AUTH_SUCCESS,
    payload: {
        token,
        userId: localId,
        expiresIn,
    }
});

export const authFail = error => ({
    type: actionTypes.AUTH_FAIL,
    error: error
});

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkOutTimeOut = expirationTime => {
    return dispatch => { 
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

const URL_SIGNUP = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBu3k_manvSxj8LFFOr8ovdaHyvVeSyWA8';
const URL_LOGIN = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBu3k_manvSxj8LFFOr8ovdaHyvVeSyWA8';

const getURL = (isSignup) => isSignup ? URL_LOGIN : URL_SIGNUP;

function storeLoginData({ payload: { idToken: token, userId, expiresIn } }) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('userId', userId);
}

function cleanUpLoginData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
}

export const authEpic = action$ => action$.pipe(
    ofType(actionTypes.AUTH_START),
    map(({ payload: { email, password, isSignup } }) => ({
        authData: { email, password, returnSecureToken: true },
        isSignup
    })),
    switchMap(({ authData, isSignup }) =>
        from(axios.post(getURL(isSignup), authData))
    ),
    map(response => authSuccess(response.data)),
    tap(storeLoginData),
    catchError(error => {
        console.error(error)
        return of(authFail(error.response.data.error))
    }),
);

export const autoLogoutEpic = action$ => action$.pipe(
    ofType(actionTypes.AUTH_SUCCESS),
    delayWhen(({ payload: { expiresIn } }) => timer(expiresIn * 1000)),
    tap(cleanUpLoginData),
    mapTo({ type: actionTypes.AUTH_LOGOUT })
)

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('Token');
        if (!token) {
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkOutTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};