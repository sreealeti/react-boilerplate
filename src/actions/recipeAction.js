import axios from 'axios';
import { FETCH_RECIPES } from './types';

export const getAllRecipes = () => dispatch => {
  axios.get('/api/recipes')
    .then(res => {
      dispatch({
        type: FETCH_RECIPES,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err)
    });
}
