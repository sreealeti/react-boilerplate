import React, { Component } from 'react';
import RecipeForm from './RecipeForm';

class RecipeNew extends Component {
  render() {
    return (
      <div>
        <h2>New Recipe</h2>
        <RecipeForm history={this.props.history} match={this.props.match} />
      </div>
    );
  }
}

export default RecipeNew;
