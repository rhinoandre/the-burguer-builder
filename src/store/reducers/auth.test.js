import reducer from './auth';
import * as actionTypes from '../actions/actionsTypes';

describe('Auth Reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    })

    it('should store the token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'Some-Token',
            userId: 'Some-Id'
        })).toEqual({
            token: 'Some-Token',
            userId: 'Some-Id',
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    })
});