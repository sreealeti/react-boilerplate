import axios from 'axios';
import { FETCH_RECIPES, GET_RECIPE, GET_ERRORS } from './types';

export const getAllRecipes = () => dispatch => {
  axios.get('http://ucp01:5000/api/recipes')
    .then(res => {
      dispatch({
        type: FETCH_RECIPES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
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
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}

export const patchRecipe = (url, recipe, history) => dispatch => {
  axios.patch(url, recipe)
    .then(res => {
      history.push('/recipes');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}
export const delRecipe = (url) => dispatch => {
  axios.delete(url)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}

export const addRecipe = (recipe, history) => dispatch => {
  axios.post('http://ucp01:5000/api/recipes', recipe)
    .then(res => {
      history.push('/recipes');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}
