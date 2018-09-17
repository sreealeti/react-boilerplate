import axios from 'axios';
import { FETCH_RECIPES, ADD_RECIPE, GET_RECIPE, PATCH_RECIPE } from './types';

export const getAllRecipes = () => dispatch => {
  axios.get('http://ucp01:5000/api/recipes')
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
export const getRecipe = (url) => dispatch => {
  axios.get(url)
    .then(res => {
      dispatch({
        type: GET_RECIPE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err)
    });
}

export const patchRecipe = (recipe) => dispatch => {
  axios.patch('http://ucp01:5000/api/recipes', recipe)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: PATCH_RECIPE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err)
    });
}
export const delRecipe = (recipe) => dispatch => {
  axios.post('http://ucp01:5000/api/recipes', recipe)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: ADD_RECIPE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err)
    });
}

export const addRecipe = (recipe) => dispatch => {
  axios.post('http://ucp01:5000/api/recipes', recipe)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: ADD_RECIPE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err)
    });
}
