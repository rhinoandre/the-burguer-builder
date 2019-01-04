import * as actionType from './actions';

const initialState = {
    ingredients: {
        salada: 0,
        beacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4,
};

const reducer = (state = initialState, actions) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [actions.ingredientName]: state.ingredients[action.ingredientName] + 1
                }
            }
        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [actions.ingredientName]: state.ingredients[action.ingredientName] + 1
                }
            }
        default:
            return state;
    }
};

export default reducer;