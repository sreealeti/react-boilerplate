import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addRecipe, getRecipe } from '../../actions/recipeAction';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import GridContainer from "material-kit-react/components/Grid/GridContainer";
import GridItem from "material-kit-react/components/Grid/GridItem";
import Card from "material-kit-react/components/Card/Card";
import CardBody from "material-kit-react/components/Card/CardBody";
import CardHeader from "material-kit-react/components/Card/CardHeader";

import RecipesStyle from '../../styles/RecipesStyle'

class RecipeForm extends Component {
  emptyIngredient = {
    id: null,
    name: '',
    quantity: '',
    _destroy: false
  };

  emptyDirection = {
    id: null,
    step: '',
    _destroy: false
  };
  state = {
    recipe: {
      title: '',
      description: '',
      photo: null,
      ingredients_attributes: [Object.assign({}, this.emptyIngredient)],
      directions_attributes: [Object.assign({}, this.emptyDirection)]
    },
    errors: {}
  };

  handleChange = name => e => {
    let { recipe } = this.state;
    recipe[name] = e.target.value;
    console.log(recipe);
    this.setState({ recipe: recipe });
  };
  handleFileChange = (e) => {
    let { recipe } = this.state;
    console.log(e.target.files[0])
    recipe["photo"] = e.target.files[0];
    this.setState({recipe: recipe});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.recipe);
    const formData = new FormData()
    formData.append('recipe[title]', this.state.recipe.title)
    formData.append('recipe[description]', this.state.recipe.description)
    if (this.state.recipe.photo){
      formData.append('recipe[photo]', this.state.recipe.photo,this.state.recipe.photo.name)
    }
    formData.append('recipe[ingredients]', JSON.stringify(this.state.recipe.ingredients_attributes))
    formData.append('recipe[directions]', JSON.stringify(this.state.recipe.directions_attributes))
    this.props.addRecipe(formData);

  }
  handleAddDirection = (e) => {
    e.preventDefault();
    this.state.recipe.directions_attributes.push(Object.assign({}, this.emptyDirection));
    this.setState({recipe: this.state.recipe});
  }
  handleAddIngredient = (e) => {
    e.preventDefault();
    this.state.recipe.ingredients_attributes.push(Object.assign({}, this.emptyIngredient));
    this.setState({recipe: this.state.recipe});
  }
  handleRemoveNestedData = data => e => {
    data._destroy = true;
    this.setState({recipe: this.state.recipe});
  }
  onDirectionStepChange = direction => e => {
    direction.step = e.target.value
    this.setState({ recipe: this.state.recipe});

  }
  onIngredientnameChange = ingredient => e => {
    ingredient.name = e.target.value
    this.setState({ recipe: this.state.recipe});

  }
  onIngredientquantityChange = ingredient => e => {
    ingredient.quantity = e.target.value
    this.setState({ recipe: this.state.recipe});

  }
  renderDirectionForm(){
    let counter = 0;
    return this.state.recipe.directions_attributes.map((direction, index) => {
      if (direction._destroy === false) {
        let directionDOM = (
          <div key={index} >
            <TextField
              required
              id="step"
              name="step"
              label="step"
              value={direction.step}
              onChange={this.onDirectionStepChange(direction)}
            />
            <Button variant="contained" size="small" color="primary" aria-label="Add" onClick={this.handleRemoveNestedData(direction)}>
              Delete Direction
            </Button>
          </div>
        );
        counter++;
        return directionDOM;
      } else {
        return null;
      }
    });
  }
  renderIngredientForm(){
    let counter = 0;
    return this.state.recipe.ingredients_attributes.map((ingredient, index) => {
      if (ingredient._destroy === false) {
        let ingredientDOM = (
          <div key={index} >
            <TextField
              required
              id="name"
              name="name"
              label="name"
              value={ingredient.name}
              onChange={this.onIngredientnameChange(ingredient)}
            />
            <TextField
              required
              id="quantity"
              name="quantity"
              label="quantity"
              value={ingredient.quantity}
              onChange={this.onIngredientquantityChange(ingredient)}
            />
            <Button variant="contained" size="small" color="primary" aria-label="Add" onClick={this.handleRemoveNestedData(ingredient)}>
              Delete Ingredient
            </Button>
          </div>
        );
        counter++;
        return ingredientDOM;
      } else {
        return null;
      }
    });
  }


  componentWillMount() {
    if (this.props.match.params.id) {
      const url = `/api/recipes/${this.props.match.params.id}`
      this.props.getRecipe(url);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      recipe: nextProps.recipe
    });
  }

  render(){
    const { classes } = this.props;
    const { errors, recipe } = this.state;
    console.log(recipe)
    return(
      <div>
        <Card className={classes.card}>
          <CardBody>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} lg={8}>
                <TextField
                  required
                  id="title"
                  name="title"
                  label="title"
                  fullWidth
                  value={recipe.title}
                  onChange={this.handleChange('title')}
                />
                <TextField
                  required
                  id="description"
                  name="description"
                  label="description"
                  fullWidth
                  value={recipe.description}
                  onChange={this.handleChange('description')}
                  multiline={true}
                  rows={2}

                />
                <input
                  accept="image/*"
                  className={classes.input}
                  id="flat-button-file"
                  type="file"
                  onChange={this.handleFileChange}
                />
                <label htmlFor="flat-button-file">
                  <Button component="span" color="primary">
                    Upload
                  </Button>
                </label>
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <Typography>Directions</Typography>
                {this.renderDirectionForm()}
                <Button variant="contained" size="small" color="primary" aria-label="Add" onClick={this.handleAddDirection}>
                  Add Direction
                </Button>
              </GridItem>
              <GridItem xs={12} sm={12} md={12} lg={12}>
                <Typography>Ingredients</Typography>
                {this.renderIngredientForm()}
                <Button variant="contained" size="small" color="primary" aria-label="Add" onClick={this.handleAddIngredient}>
                  Add Ingredient
                </Button>

              </GridItem>
              <Button variant="contained" color="primary" aria-label="Add" onClick={this.handleSubmit}>
                submit
              </Button>
            </GridContainer>
          </CardBody>
        </Card>
      </div>
    )
  }

}

RecipeForm.propTypes = {
  classes: PropTypes.object.isRequired,
  addRecipe: PropTypes.func.isRequired,
  getRecipe: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  recipe: state.recipes.recipe,
  errors: state.errors
})
export default connect(mapStateToProps, { addRecipe, getRecipe })(withStyles(RecipesStyle)(RecipeForm));
