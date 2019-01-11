import * as actionType from '../actions/actionaTypes';
import axios from 'axios';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionType.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = error => {
    return {
        type: actionType.purchaseBurgerFail,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionType.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = orderData => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response.data);
                dispatch( purchaseBurgerSuccess(response.data, orderData) );
            })
            .catch(error => {
                dispatch( purchaseBurgerFail(error) );
            });
    }
}
