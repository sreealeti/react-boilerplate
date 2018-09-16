import { FETCH_RECIPES, GET_RECIPE, PATCH_RECIPE, DEL_RECIPE } from '../actions/types';

const initialState = {
    recipes: [],
    recipe: {}
}

export default function recipeReducer(state = initialState, action ) {
    switch(action.type) {
        case FETCH_RECIPES:
            return {
                ...state,
                recipes: action.payload
            }
        case GET_RECIPE:
            return {
                ...state,
                recipe: action.payload
            }
        case PATCH_RECIPE:
            return {
                ...state,
                recipe: action.payload
            }
        case DEL_RECIPE:
            return {
                ...state,
                recipe: action.payload
            }
        default:
            return state;
    }
}
