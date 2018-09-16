import React, { Component } from 'react';
import RecipeForm from './RecipeForm';

class RecipeEdit extends Component {
  render() {
    return (
      <div>
        <h2>Edit Recipe</h2>
        <RecipeForm history={this.props.history} match={this.props.match} />
      </div>
    );
  }
}

export default RecipeEdit;
