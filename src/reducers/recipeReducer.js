import { FETCH_RECIPES } from '../actions/types';

const initialState = {
    recipes: []
}

export default function recipeReducer(state = initialState, action ) {
    switch(action.type) {
        case FETCH_RECIPES:
            return {
                ...state,
                recipes: action.payload
            }
        default:
            return state;
    }
}
