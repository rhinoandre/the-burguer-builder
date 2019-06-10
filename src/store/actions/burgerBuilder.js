import * as actionTypes from './actionsTypes';
import axios from '../../aixos-orders';
import { ofType } from 'redux-observable';
import { map, switchMapTo, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';

export const addIngredient = name => ({
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
});

export const removeIngredient = name => ({
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
});

export const setIngredients = ingredients => ({
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
});

export const fetchIngredientsFailed = () => ({ type: actionTypes.FETCH_INGREDIENTS_FAILED });
export const fetchIngredients = () => ({ type: actionTypes.FETCH_INGREDIENTS });

export const initIngredientsEpic = action$ => action$.pipe(
    ofType(actionTypes.FETCH_INGREDIENTS),
    switchMapTo(from(axios.get('/ingredients.json'))),
    map(response => setIngredients(response.data)),
    catchError(() => of(fetchIngredientsFailed())),
)